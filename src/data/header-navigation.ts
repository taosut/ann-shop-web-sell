import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Trang chủ', url: '/'},
    {label: 'Hàng mới về', url:'/shop', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam', url: '/shop/category/quan-ao-nam'},
            {label: 'Quần áo nữ', url: '/shop/category/quan-ao-nu'}
        ] 
    }},
    {label: 'Danh mục sản phẩm', url:'/blog/post/danh-muc-san-pham', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam', url: '/shop/category/quan-ao-nam', items: [
                {label: 'Set bộ nam', url: '/shop/category/set-bo-nam'},
                {label: 'Áo thun nam', url: '/shop/category/ao-thun-nam'},
                {label: 'Áo thun cá sấu',    url: '/shop/category/ao-thun-ca-sau'},
                {label: 'Áo thun sọc ngang', url: '/shop/category/ao-thun-soc-ngang'},
                {label: 'Áo thun thể thao',  url: '/shop/category/ao-thun-the-thao'},
                {label: 'Áo sơ mi nam', url: '/shop/category/ao-so-mi-nam'},
                {label: 'Sơ mi nam VNXK',    url: '/shop/category/ao-so-mi-nam-xuat-khau'},
                {label: 'Sơ mi nam Hàn Quốc', url: '/shop/category/ao-so-mi-nam-han-quoc'},
                {label: 'Áo khoác nam', url: '/shop/category/ao-khoac-nam'},
                {label: 'Quần nam', url: '/shop/category/quan-nam'},
                {label: 'Quần jeans nam',    url: '/shop/category/quan-jeans-nam'},
                {label: 'Quần dài nam', url: '/shop/category/quan-dai-nam'},
                {label: 'Quần short nam', url: '/shop/category/quan-short-nam'},
                {label: 'Quần lót nam', url: '/shop/category/quan-lot-nam'},
            ]},
            {label: 'Quần áo nữ', url: '/shop/category/quan-ao-nu', items: [
                {label: 'Váy đầm', url: '/shop/category/vay-dam'},
                {label: 'Đồ bộ nữ', url: '/shop/category/do-bo-nu'},
                {label: 'Áo thun nữ', url: '/shop/category/ao-thun-nu'},
                {label: 'Áo khoác nữ', url: '/shop/category/ao-khoac-nu'},
                {label: 'Đồ lót nữ', url: '/shop/category/do-lot-nu'},
                {label: 'Áo sơ mi nữ', url: '/shop/category/ao-so-mi-nu'},
                {label: 'Áo thun teen', url: '/shop/category/ao-thun-teen'},
                {label: 'Quần nữ', url: '/shop/category/quan-nu'},
                {label: 'Quần jeans nữ', url: '/shop/category/quan-jeans-nu'},
                {label: 'Áo dài cách tân', url: '/shop/category/ao-dai-cach-tan'},
            ]},
            {label: 'Nước hoa', url: '/shop/category/nuoc-hoa'},
        ] 
    }},
    {label: 'Chính sách bán sỉ', url: '/blog/post/chinh-sach-ban-si'},
    {label: 'Sản phẩm đã lưu', url: '/shop/wishlist'},
];
