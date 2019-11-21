import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Trang chủ', url: '/'},
    {label: 'Hàng có sẵn mới về', url:'/shop/hang-co-san', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam có sẵn', url: '/category/quan-ao-nam/hang-co-san'},
            {label: 'Quần áo nữ có sẵn', url: '/category/quan-ao-nu/hang-co-san'},
            {label: 'Nước hoa có sẵn', url: '/category/nuoc-hoa'}
        ]
    }},
    {label: 'Hàng order mới về', url:'/shop/hang-order', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam order', url: '/category/quan-ao-nam/hang-order'},
            {label: 'Quần áo nữ order', url: '/category/quan-ao-nu/hang-order'}
        ]
    }},
    {label: 'Danh mục sản phẩm', url:'/page/danh-muc-san-pham', menu: {
        type: 'menu',
        items: [
            {label: 'Bao lì xì tết', url: '/category/bao-li-xi-tet'},
            {label: 'Quần áo nam', url: '/category/quan-ao-nam', items: [
                {label: 'Áo thun nam', url: '/category/ao-thun-nam'},
                {label: 'Áo thun cá sấu',    url: '/category/ao-thun-ca-sau'},
                {label: 'Áo thun sọc ngang', url: '/category/ao-thun-soc-ngang'},
                {label: 'Áo thun thể thao',  url: '/category/ao-thun-the-thao'},
                {label: 'Sơ mi nam', url: '/category/ao-so-mi-nam'},
                {label: 'Áo khoác nam', url: '/category/ao-khoac-nam'},
                {label: 'Quần nam', url: '/category/quan-nam'},
                {label: 'Quần jeans nam',    url: '/category/quan-jeans-nam'},
                {label: 'Quần dài nam', url: '/category/quan-dai-nam'},
                {label: 'Quần short nam', url: '/category/quan-short-nam'},
                {label: 'Quần lót nam', url: '/category/quan-lot-nam'},
                {label: 'Set bộ nam', url: '/category/set-bo-nam'}
            ]},
            {label: 'Quần áo nữ', url: '/category/quan-ao-nu', items: [
                {label: 'Váy đầm', url: '/category/vay-dam'},
                {label: 'Đồ bộ nữ', url: '/category/do-bo-nu'},
                {label: 'Áo thun nữ', url: '/category/ao-thun-nu'},
                {label: 'Áo khoác nữ', url: '/category/ao-khoac-nu'},
                {label: 'Đồ lót nữ', url: '/category/do-lot-nu'},
                {label: 'Sơ mi nữ', url: '/category/ao-so-mi-nu'},
                {label: 'Quần nữ', url: '/category/quan-nu'},
                {label: 'Quần jeans nữ', url: '/category/quan-jeans-nu'},
                {label: 'Áo dài cách tân', url: '/category/ao-dai-cach-tan'}
            ]},
            {label: 'Nước hoa', url: '/category/nuoc-hoa'}
        ]
    }},
    {label: 'Hướng dẫn', url: '/page/chinh-sach-ban-si', menu: {
        type: 'menu',
        items: [
            {label: 'Hướng dẫn đặt hàng', url: '/page/huong-dan-dat-hang'},
            {label: 'Chính sách bán sỉ', url: '/page/chinh-sach-ban-si'},
            {label: 'Chính sách vận chuyển', url: '/page/chinh-sach-van-chuyen'},
            {label: 'Chính sách đổi trả', url: '/page/chinh-sach-doi-tra'},
            {label: 'Bảng size quần áo nam', url: '/page/bang-size-quan-ao-nam'},
            {label: 'Các Zalo xem hàng', url: '/page/zalo-xem-hang'}
        ]
    }},
];
