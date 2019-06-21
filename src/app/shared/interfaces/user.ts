export interface Shop {
    phone: string;
    address: string;
}

export interface Setting {
    showProductName: boolean;
    showSKU: boolean;
    increntPrice: number;
}

export interface User {
    name: string;
    shop: Shop;
    setting: Setting;
}
