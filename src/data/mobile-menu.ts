import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
    {type: 'link', label: 'Hàng mới về', url: '/shop'},
    {type: 'button', label: 'Danh mục sản phẩm', children: [
        {type: 'link', label: 'Quần áo nam', url: '/shop/category/quan-ao-nam', children: [
            {type: 'link', label: 'Set bộ nam', url: '/shop/category/set-bo-nam'},
            {type: 'link', label: 'Áo thun nam', url: '/shop/category/ao-thun-nam', children: [
                {type: 'link', label: 'Áo thun cá sấu',    url: '/shop/category/ao-thun-ca-sau'},
                {type: 'link', label: 'Áo thun sọc ngang', url: '/shop/category/ao-thun-soc-ngang'},
                {type: 'link', label: 'Áo thun thể thao',  url: '/shop/category/ao-thun-the-thao'},
            ]},
            {type: 'link', label: 'Áo sơ mi nam', url: '/shop/category/ao-so-mi-nam', children: [
                {type: 'link', label: 'Sơ mi nam VNXK',    url: '/shop/category/ao-so-mi-nam-xuat-khau'},
                {type: 'link', label: 'Sơ mi nam Hàn Quốc', url: '/shop/category/ao-so-mi-nam-han-quoc'},
            ]},
            {type: 'link', label: 'Áo khoác nam', url: '/shop/category/ao-khoac-nam'},
            {type: 'link', label: 'Quần nam', url: '/shop/category/quan-nam', children: [
                {type: 'link', label: 'Quần jeans nam',    url: '/shop/category/quan-jeans-nam'},
                {type: 'link', label: 'Quần dài nam', url: '/shop/category/quan-dai-nam'},
                {type: 'link', label: 'Quần short nam', url: '/shop/category/quan-short-nam'},
            ]},
            {type: 'link', label: 'Quần lót nam', url: '/shop/category/quan-lot-nam'},
        ]},
        {type: 'link', label: 'Quần áo nữ', url: '/shop/category/quan-ao-nu', children: [
            {type: 'link', label: 'Váy đầm', url: '/shop/category/vay-dam'},
            {type: 'link', label: 'Đồ bộ nữ', url: '/shop/category/do-bo-nu'},
            {type: 'link', label: 'Áo thun nữ', url: '/shop/category/ao-thun-nu'},
            {type: 'link', label: 'Áo khoác nữ', url: '/shop/category/ao-khoac-nu'},
            {type: 'link', label: 'Đồ lót nữ', url: '/shop/category/do-lot-nu'},
            {type: 'link', label: 'Áo sơ mi nữ', url: '/shop/category/ao-so-mi-nu'},
            {type: 'link', label: 'Áo thun teen', url: '/shop/category/ao-thun-teen'},
            {type: 'link', label: 'Quần nữ', url: '/shop/category/quan-nu'},
            {type: 'link', label: 'Quần jeans nữ', url: '/shop/category/quan-jeans-nu'},
            {type: 'link', label: 'Áo dài cách tân', url: '/shop/category/ao-dai-cach-tan'},

        ]},
        {type: 'link', label: 'Nước hoa', url: '/shop/category/nuoc-hoa'},
    ]},
];
