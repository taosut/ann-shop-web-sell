import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Directive({
  selector: '[appRouteTransformer]'
})
export class RouteTransformerDirective {

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  public onClick(event: any) {
    let target: HTMLElement = event.target;

    switch (target.tagName) {
      case 'A':
        this.onClickATag(event, target);
        break;
      case 'IMG':
        this.onClickImageTag(event, <HTMLImageElement>target.parentElement);
        break;
      default:
        break;
    }
  }

  /**
   * Kiểm tra xem phải router link và thưc thi navigation
   * @param href 
   */
  private routeTransformer(event: any, href: string) {
    if (!href.match(/^https|http:\/\//g)) {
      this.router.navigateByUrl(href);
      event.preventDefault();
    }
  }

  /**
   * Xử lý khi click vào image tag
   * @param element 
   */
  private onClickImageTag(event: any, element: HTMLImageElement) {
    if (element.tagName === 'A') {
      this.routeTransformer(event, element.getAttribute('href'));
    }
  }

  /**
   * Xử lý khi click vào a tag
   * @param element 
   */
  private onClickATag(event: any, element: HTMLElement) {
    this.routeTransformer(event, element.getAttribute('href'));
  }
}
