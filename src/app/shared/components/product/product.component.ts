import { Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, QueryList, ViewChild, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ProductImage, ProductDetail } from '../../interfaces/product';
import { CarouselComponent, SlidesOutputData } from 'ngx-owl-carousel-o';
import { FormControl } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { isPlatformBrowser, formatNumber } from '@angular/common';
import { OwlCarouselOConfig } from 'ngx-owl-carousel-o/lib/carousel/owl-carousel-o-config';
import { PhotoSwipeService } from '../../services/photo-swipe.service';
import { DirectionService } from '../../services/direction.service';
import { User } from '../../interfaces/user';
import { CurrencyService } from '../../services/currency.service';
import { CopyConfigService } from '../../services/copy-config.service';
import { ProductService } from '../../services/product.service';

export type Layout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    private dataProduct: ProductDetail;
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

    @Input() set product(value: ProductDetail) {
        this.dataProduct = value;
        this.quantity.setValue(value ? value.quantity : 1);
        if (value)
        {
            let carousel_image: ProductImage[] = [];
            // Add avatar làm anh chính
            carousel_image.push({
                id: '0',
                url: value.avatar,
                active: true
            })

            // Add product image
            this.dataProduct.images.map((url, index) => {
                carousel_image.push({
                    id: (index + 1).toString(),
                    url,
                    active: false
                });
            })

            this.images = carousel_image;
        }
    }
    get product(): ProductDetail {
        return this.dataProduct;
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

    quantity: FormControl = new FormControl(1);

    addingToCart = false;
    addingToWishlist = false;
    addingToCompare = false;
    showingCopyConfig = false;
    copyingProductInfo = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private cart: CartService,
        private wishlist: WishlistService,
        private compare: CompareService,
        private photoSwipe: PhotoSwipeService,
        private direction: DirectionService,
        private http: HttpClient,
        private cd: ChangeDetectorRef,
        private copyConfig: CopyConfigService,
        private service: ProductService
    ) { }

    ngOnInit(): void {
        if (this.layout !== 'quickview' && isPlatformBrowser(this.platformId)) {
            this.photoSwipe.load().subscribe();
        }
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

    addToCart(): void {
        if (!this.addingToCart && this.product && this.quantity.value > 0) {
            this.addingToCart = true;

            this.cart.add(this.product, this.quantity.value).subscribe({ complete: () => this.addingToCart = false });
        }
    }

    addToWishlist(): void {
        if (!this.addingToWishlist && this.product) {
            this.addingToWishlist = true;

            this.wishlist.add(this.product).subscribe({ complete: () => this.addingToWishlist = false });
        }
    }

    addToCompare(): void {
        if (!this.addingToCompare && this.product) {
            this.addingToCompare = true;

            this.compare.add(this.product).subscribe({ complete: () => this.addingToCompare = false });
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
        let variableID = [];

        if (this.color) variableID.push(this.color);
        if (this.size) variableID.push(this.size);

        if (variableID.length > 0) {
            let url = environment.apiProduct + `/${this.product.id}/image`
            let paramUrl = "?"
            variableID.forEach(item => paramUrl += `&variables=${item}`);
            this.http
                .get(url + paramUrl)
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

        let regexFiles: string[] = imageURL.match(/[a-z0-9\-\.]+$/g);
        return regexFiles.length ? `/uploads/images/${size}/${regexFiles[0]}` : "";
    }

    showCopyConfig(): void {
        if (this.showingCopyConfig) {
            return;
        }

        this.showingCopyConfig = true;
        const userJSON = localStorage.getItem('user');
        let user: User = userJSON ? JSON.parse(userJSON) : null;

        this.copyConfig.show(user).subscribe({
            complete: () => {
                this.showingCopyConfig = false;
                this.cd.markForCheck();
            }
        });
    }


    copyProductInfo(btCopy: HTMLButtonElement): void {
        if (this.copyingProductInfo) {
            return;
        }

        this.copyingProductInfo = true;
        let result = this.service.copyInfo(this.product);
        this.copyingProductInfo = false;
        this.cd.markForCheck();

        if (result) btCopy.innerHTML = "Đã COPY";
    }

    saveProductImage(): void {
        this.service.saveProductImage(this.product.sku)
    }
}
