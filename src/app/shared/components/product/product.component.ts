// Angular
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  ChangeDetectorRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// third-party
import { CarouselComponent, SlidesOutputData } from 'ngx-owl-carousel-o';
import { OwlCarouselOConfig } from 'ngx-owl-carousel-o/lib/carousel/owl-carousel-o-config';

// RxJS
import { timer } from 'rxjs';


// ANN Shop
// Enum
import { ProductBadge } from '../../interfaces/common/product-bage';
// Interface
import { Product } from '../../interfaces/common/product';
import { ProductCard } from '../../interfaces/common/product-card';
import { ProductImage } from '../../interfaces/product/product-image';
import { ProductService } from '../../services/pages/product.service';
import { WishlistProduct } from '../../../shared/interfaces/wishlist/wishlist-product'
// Service
import { DirectionService } from '../../services/direction.service';
import { WishlistService } from '../../services/wishlist.service';
import { PhotoSwipeService } from '../../services/photo-swipe.service';
import { RootService } from '../../services/root.service';
import { DownloadImageService } from '../../services/modals/download-image.service';

export type Layout = 'standard' | 'sidebar' | 'columnar' | 'quickview';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private dataProduct: Product;
  private dataLayout: Layout = 'standard';
  private hasVariable: boolean = false;
  private colorElement: HTMLInputElement;
  private color: number = 0;
  private sizeElement: HTMLInputElement;
  private size: number = 0;

  showGallery = true;
  showGalleryTimeout: number;

  @ViewChild('featuredCarousel', { read: CarouselComponent }) featuredCarousel: CarouselComponent;
  @ViewChild('thumbnailsCarousel', { read: CarouselComponent }) thumbnailsCarousel: CarouselComponent;
  @ViewChildren('imageElement', { read: ElementRef }) imageElements: QueryList<ElementRef>;

  @Input() set layout(value: Layout) {
    this.dataLayout = value;

    if (isPlatformBrowser(this.platformId)) {
      // this dirty hack is needed to re-initialize the gallery after changing the layout
      clearTimeout(this.showGalleryTimeout);
      this.showGallery = false;
      this.showGalleryTimeout = window.setTimeout(() => {
        this.showGallery = true;
      }, 0);
    }
  }
  get layout(): Layout {
    return this.dataLayout;
  }

  @Input() set product(value: Product) {
    this.dataProduct = value;
    if (value) {
      let carousel_image: ProductImage[] = [];

      // Add product image
      this.dataProduct.images.map((url, index) => {
        let active: boolean = false;

        if (this.extractImage(url) === value.avatar)
          active = true;

        carousel_image.push({
          id: index.toString(),
          url,
          active: active
        });
      })

      this.images = carousel_image;
    }
  }
  get product(): Product {
    return this.dataProduct;
  }
  get productCard() : ProductCard {
    if (this.dataLayout) {
      return {
        productID: this.product.id,
        name: this.product.name,
        sku: this.product.sku,
        slug: this.product.slug,
        materials: this.product.materials,
        colors: this.product.colors,
        sizes: this.product.sizes,
        badge: this.product.badge,
        availability: false,
        thumbnails: this.product.thumbnails,
        regularPrice: this.product.regularPrice,
        oldPrice: this.product.odlPrice,
        retailPrice: this.product.retailPrice,
        content: this.product.content
      };
    }
    else {
      return null;
    }
  }

  images: ProductImage[] = [];

  carouselOptions: Partial<OwlCarouselOConfig> = {
    dots: false,
    autoplay: false,
    responsive: {
      0: { items: 1 }
    },
    rtl: this.direction.isRTL()
  };

  thumbnailsCarouselOptions: Partial<OwlCarouselOConfig> = {
    dots: false,
    autoplay: false,
    margin: 10,
    items: 5,
    responsive: {
      480: { items: 5 },
      380: { items: 4 },
      0: { items: 3 }
    },
    rtl: this.direction.isRTL()
  };

  addingToWishlist = false;
  copyingProductInfo = false;
  showingImageDownload: boolean;

  ProductBadgeEnum = ProductBadge;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private cd: ChangeDetectorRef,
    private direction: DirectionService,
    private photoSwipe: PhotoSwipeService,
    private wishlist: WishlistService,
    private service: ProductService,
    private downloadImage: DownloadImageService,
    public root: RootService
  ) {
    this.showingImageDownload = false;
  }

  ngOnInit(): void {
    if (this.layout !== 'quickview' && isPlatformBrowser(this.platformId)) {
      this.photoSwipe.load().subscribe();
    }
  }

  private extractImage (url: string): string {
    let image: string = "";
    let regex: string[] = url.match(/[a-z0-9\_\-\.]+$/g);
    
    if (regex.length > 0)
      image = regex[0];

    return image
  }

  setActiveImage(image: ProductImage): void {
    this.images.forEach(eachImage => eachImage.active = eachImage === image);
  }

  featuredCarouselTranslated(event: SlidesOutputData): void {
    if (event.slides.length) {
      const activeImageId = event.slides[0].id;
      this.images.forEach(eachImage => eachImage.active = eachImage.id === activeImageId);

      if (!this.thumbnailsCarousel.slidesData.find(slide => slide.id === event.slides[0].id && slide.isActive)) {
        this.thumbnailsCarousel.to(event.slides[0].id);
      }

      // Case image select by variable
      if (!this.hasVariable) {
        this.color = 0;
        this.size = 0;
        if (this.colorElement) this.colorElement.checked = false;
        if (this.sizeElement) this.sizeElement.checked = false;
      }

      this.hasVariable = false;
    }
  }

  addToWishlist(): void {
    if (!this.addingToWishlist && this.product) {
      let data: WishlistProduct = {
        productID: this.product.id,
        name: this.product.name,
        sku: this.product.sku,
        thumbnails: this.product.thumbnails,
        badge: this.product.badge,
        regularPrice: this.product.regularPrice,
      }

      this.addingToWishlist = true;
      this.wishlist.add(data).subscribe({ complete: () => this.addingToWishlist = false });
    }
  }

  openPhotoSwipe(event: MouseEvent, image: ProductImage): void {
    if (this.layout !== 'quickview') {
      event.preventDefault();

      const images = this.images.map(eachImage => {
        return {
          src: eachImage.url,
          msrc: eachImage.url,
          w: 700,
          h: 700
        };
      });
      const options = {
        getThumbBoundsFn: index => {
          const imageElement = this.imageElements.toArray()[index].nativeElement;
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          const rect = imageElement.getBoundingClientRect();

          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        index: this.images.indexOf(image),
        bgOpacity: .9,
        history: false
      };

      this.photoSwipe.open(images, options).subscribe(galleryRef => {
        galleryRef.listen('beforeChange', () => {
          this.featuredCarousel.to(this.images[galleryRef.getCurrentIndex()].id);
        });
      });
    }
  }

  private selectImageWithVariable(): void {
    if (this.color || this.size) {
      this.service.getImage(this.product.id, this.color, this.size)
        .subscribe((data: string) => {
          if (data) {
            let image: ProductImage;

            this.images.forEach(eachImage => {
              if (eachImage.url === data) {
                eachImage.active = true;
                image = eachImage;
              }
            });

            if (image) {
              if (!this.thumbnailsCarousel.slidesData.find(slide => slide.id === image.id && slide.isActive)) {
                this.thumbnailsCarousel.to(image.id);
              }

              this.featuredCarousel.to(image.id);
            }
          }
        });
    }
  }

  selectColor(el: HTMLInputElement, id: number): void {
    this.hasVariable = true;
    this.colorElement = el;

    if (this.color && this.color === id) {
      this.color = 0;
      this.colorElement.checked = false;
    }
    else {
      this.color = id;
    }

    this.selectImageWithVariable();
  }

  selectSize(el: HTMLInputElement, id: number): void {
    this.hasVariable = true;
    this.sizeElement = el;

    if (this.size && this.size === id) {
      this.size = 0;
      this.sizeElement.checked = false;
    }
    else {
      this.size = id;
    }

    this.selectImageWithVariable();
  }

  getImageThumbnail(imageURL: string, size: string): string {
    if (!imageURL) return "";
    if (imageURL.match(/^\/App_Themes\/Ann\/image\/.+$/g)) return imageURL;

    let image = this.extractImage(imageURL);
    return image ? `/uploads/images/${size}/${image}` : "";
  }

  copyProductInfo(product: ProductCard, btCopy: HTMLButtonElement): void {
    if (this.copyingProductInfo) {
      return;
    }

    this.copyingProductInfo = true;
    timer(500).subscribe((_) => {
      this.service.getContentProductAdvertisement(product)
        .subscribe((copying: boolean) => {
          this.copyingProductInfo = copying;
          this.cd.markForCheck();
          btCopy.innerHTML = "Đã Copy";
        })
    });

  }

  saveProductImage(product: ProductCard): void {
    if (product) {
      this.showingImageDownload = true;

      this.downloadImage.show(product).subscribe(
        _ => {
          this.showingImageDownload = false;
          this.cd.markForCheck();
        }
      );
    }
  }
}
