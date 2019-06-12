import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = '68 Đường C12, P13, Tân Bình, TP.HCM';
    email = 'tranyenngoc9x@gmail.com';
    phone = ['0915400401', '0918567409', '0913268406'];
    hours = 'Thứ 2 - Thứ 7: 8h30 - 19h30, Chủ nhật: 8h30 - 17h';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
