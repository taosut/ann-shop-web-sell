import { Component, ChangeDetectorRef } from '@angular/core';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CartService } from '../../../../shared/services/cart.service';
import { CopyConfigService } from 'src/app/shared/services/copy-config.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
    selector: 'app-mobile-header',
    templateUrl: './mobile-header.component.html',
    styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent {
    showingCopyConfig: boolean = false;

    constructor(
        private cd: ChangeDetectorRef,
        public menu: MobileMenuService,
        public wishlist: WishlistService,
        public cart: CartService,
        public copyConfig: CopyConfigService
    ) { }

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
}
