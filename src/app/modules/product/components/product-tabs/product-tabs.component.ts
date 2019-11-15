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

  contentImages: string[];
  constructor() {
    this.withSidebar = false;
    this.tab = 'description';

    this.contentImages = [];
  }

  get content(): string {
    let content: string = "";

    if (this.product && this.product.content) {
      let images: string[] = this.product.content.match(/<img[\w\W]+?>/g) || [];

      images.forEach((item) => {
        let srcImage = item.match(/\/[a-zA-Z0-9\/\-\.]+\w/g) || [];

        if (srcImage.length > 0)
          this.contentImages.push(srcImage[0]);
      })

      this.product.content = this.product.content.replace(/<img[\w\W]+?>/g, '');
      content += this.product.content ? this.product.content + "<br>" : "";
    }

    return content;
  }

  get images(): string[] {
    let images: string[] = [];

    this.contentImages.forEach((item) => images.push(item));

    if (this.product && this.product.images) {
      this.product.images
        .filter((item: string) => !(item in this.contentImages))
        .forEach((item: string) => {
          images.push(item);
        });
    }

    return images;
  }

}
