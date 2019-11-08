// Angular
import { Component } from '@angular/core';

// ANN Shop
// Interface
import { Thumbnail } from '../../../../shared/interfaces/common/thumbnail';
import { WishlistProduct } from 'src/app/shared/interfaces/wishlist/wishlist-product';
// Service
import { RootService } from '../../../../shared/services/root.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './page-wishlist.component.html',
  styleUrls: ['./page-wishlist.component.scss']
})
export class PageWishlistComponent {
  addedToCartProducts: WishlistProduct[];
  removedProducts: WishlistProduct[];


  constructor(
    public root: RootService,
    public wishlist: WishlistService,
  ) {
    this.addedToCartProducts = [];
    this.removedProducts = [];
  }


  addToCart(product: WishlistProduct): void {
    if (this.addedToCartProducts.includes(product)) {
      return;
    }

    this.addedToCartProducts.push(product);
    this.wishlist.add(product).subscribe({
      complete: () => {
        this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
      }
    });
  }

  remove(product: WishlistProduct): void {
    if (this.removedProducts.includes(product)) {
      return;
    }

    this.removedProducts.push(product);
    this.wishlist.remove(product).subscribe({
      complete: () => {
        this.removedProducts = this.removedProducts.filter(eachProduct => eachProduct !== product);
      }
    });
  }

  getImageThumbnail(thumbnails: Thumbnail[], size: string): string {
    let url: string = "";
    thumbnails.forEach(item => {
      if (item.size === size) {
        url = item.url;
        return false;
      }
    });

    return url
  }
}
