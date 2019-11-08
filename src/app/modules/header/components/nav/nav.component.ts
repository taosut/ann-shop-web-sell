// Angular
import { Component, Input, ChangeDetectorRef } from '@angular/core';

// ANN Shop
// Interface
import { User } from 'src/app/shared/interfaces/user';
// Service
import { CopyConfigService } from 'src/app/shared/services/copy-config.service';
import { RootService } from 'src/app/shared/services/root.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';


@Component({
  selector: 'app-header-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() departments: boolean;
  @Input() logo: boolean;
  @Input() search: boolean;

  showingCopyConfig: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private copyConfig: CopyConfigService,
    public root: RootService,
    public wishlist: WishlistService,
  ) {
    this.departments = true;
    this.logo = false;
    this.search = false;
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
