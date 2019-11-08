import { Component, Input } from '@angular/core';

export type TabType = 'description' | 'specification' | 'reviews';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent {
  @Input() withSidebar: boolean;
  @Input() tab: TabType;
  @Input() product: any;

  constructor() {
    this.withSidebar = false;
    this.tab = 'description';
  }

  get content(): string {
    let content: string = "";

    if (this.product) {
      let contentImages: string[] = content.match(/\/[a-zA-Z0-9\/\-\.]+\w/g) || [];

      content = `<h2>${this.product.name}</h2>${this.product.content ? this.product.content + "<br>" : ""}`;
      this.product.images
        .filter((item: string) => !(item in contentImages))
        .forEach((item: string) => {
          content += `<img alt="${this.product.name}" class="img-download" src="${item}"><br>`;
        });
    }

    return content;
  }
}
