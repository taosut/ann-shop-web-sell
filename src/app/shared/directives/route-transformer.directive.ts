import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Directive({
  selector: '[appRouteTransformer]'
})
export class RouteTransformerDirective {

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event.target'])
  public onClick(target: HTMLElement) {
    switch (target.tagName) {
      case 'A':
        this.onClickATag(target);
        break;
      case 'IMG':
        this.onClickImageTag(<HTMLImageElement>target.parentElement);
        break;
      default:
        break;
    }
  }

  /**
   * Kiểm tra xem phải router link và thưc thi navigation
   * @param href 
   */
  private routeTransformer(href: string) {
    if (!href.match(/^https|http:\/\//g)) {
      this.router.navigate([href]);
      event.preventDefault();
    }
  }

  /**
   * Xử lý khi click vào image tag
   * @param element 
   */
  private onClickImageTag(element: HTMLImageElement) {
    if (element.tagName === 'A') {
      this.routeTransformer(element.getAttribute('href'));
    }
  }

  /**
   * Xử lý khi click vào a tag
   * @param element 
   */
  private onClickATag(element: HTMLElement) {
    this.routeTransformer(element.getAttribute('href'));
  }
}
