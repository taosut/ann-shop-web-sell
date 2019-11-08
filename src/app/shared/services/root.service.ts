import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RootService {
    path = '';

    constructor() { }

    product(slug: string): any[] | string {
        return `${this.path}/cua-hang/san-pham/${slug}`;
    }

    post(): string {
        return `${this.path}/blog/post-classic`;
    }

    url(url: string): string {
        return this.path + url;
    }
}
