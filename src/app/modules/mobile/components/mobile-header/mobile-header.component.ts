// Angular
import { Component, ChangeDetectorRef } from '@angular/core';

// ANN Shop
// Interface
import { User } from '../../../../shared/interfaces/user';
// Service
import { CopyConfigService } from '../../../../shared/services/copy-config.service';
import { MobileMenuService } from '../../../../shared/services/mobile-menu.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';


@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent {
  showingCopyConfig: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private copyConfig: CopyConfigService,
    public menu: MobileMenuService,
    public wishlist: WishlistService
  ) {
    this.showingCopyConfig = false;
  }

  showCopyConfig(): void {
    if (this.showingCopyConfig)
      return;

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
