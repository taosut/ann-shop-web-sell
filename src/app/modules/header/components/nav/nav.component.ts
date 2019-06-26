import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../../../shared/services/cart.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { RootService } from '../../../../shared/services/root.service';
import { CopyConfigService } from 'src/app/shared/services/copy-config.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
    selector: 'app-header-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {
    @Input() departments = true;
    @Input() logo = false;
    @Input() search = false;

    showingCopyConfig: boolean = false;

    constructor(
        private cd: ChangeDetectorRef,
        public root: RootService,
        public cart: CartService,
        public wishlist: WishlistService,
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
