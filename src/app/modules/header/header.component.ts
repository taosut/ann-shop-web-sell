import { Component, Input } from '@angular/core';
import { StoreService } from '../../shared/services/store.service';

export type LayoutType = 'classic' | 'compact'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() layout: LayoutType;

  constructor(public store: StoreService) {
    this.layout = 'classic';
  }

}
