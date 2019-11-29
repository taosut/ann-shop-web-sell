import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  path = '';

  constructor() { }

  category(slug: string, badge: string = ""): string {
    if (badge)
      return `${this.path}/category/${slug}/${badge}`;
    else
      return `${this.path}/category/${slug}`;
  }

  tag(slug: string): any[] | string {
    return `${this.path}/tag/${slug}`
  }

  product(slug: string): any[] | string {
    return `${this.path}/product/${slug}`;
  }

  post(): string {
    return `${this.path}/blog/post-classic`;
  }

  url(url: string): string {
    return this.path + url;
  }
}
