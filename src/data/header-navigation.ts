import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Trang chủ', url: '/'},
    {label: 'Hàng mới về', url:'/cua-hang', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam', url: '/cua-hang/danh-muc/quan-ao-nam'},
            {label: 'Quần áo nữ', url: '/cua-hang/danh-muc/quan-ao-nu'}
        ]
    }},
    {label: 'Danh mục sản phẩm', url:'/cua-hang', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam', url: '/cua-hang/danh-muc/quan-ao-nam', items: [
                {label: 'Set bộ nam', url: '/cua-hang/danh-muc/set-bo-nam'},
                {label: 'Áo thun nam', url: '/cua-hang/danh-muc/ao-thun-nam'},
                {label: 'Áo thun cá sấu',    url: '/cua-hang/danh-muc/ao-thun-ca-sau'},
                {label: 'Áo thun sọc ngang', url: '/cua-hang/danh-muc/ao-thun-soc-ngang'},
                {label: 'Áo thun thể thao',  url: '/cua-hang/danh-muc/ao-thun-the-thao'},
                {label: 'Áo sơ mi nam', url: '/cua-hang/danh-muc/ao-so-mi-nam'},
                {label: 'Sơ mi nam VNXK',    url: '/cua-hang/danh-muc/ao-so-mi-nam-xuat-khau'},
                {label: 'Sơ mi nam Hàn Quốc', url: '/cua-hang/danh-muc/ao-so-mi-nam-han-quoc'},
                {label: 'Áo khoác nam', url: '/cua-hang/danh-muc/ao-khoac-nam'},
                {label: 'Quần nam', url: '/cua-hang/danh-muc/quan-nam'},
                {label: 'Quần jeans nam',    url: '/cua-hang/danh-muc/quan-jeans-nam'},
                {label: 'Quần dài nam', url: '/cua-hang/danh-muc/quan-dai-nam'},
                {label: 'Quần short nam', url: '/cua-hang/danh-muc/quan-short-nam'},
                {label: 'Quần lót nam', url: '/cua-hang/danh-muc/quan-lot-nam'},
            ]},
            {label: 'Quần áo nữ', url: '/cua-hang/danh-muc/quan-ao-nu', items: [
                {label: 'Váy đầm', url: '/cua-hang/danh-muc/vay-dam'},
                {label: 'Đồ bộ nữ', url: '/cua-hang/danh-muc/do-bo-nu'},
                {label: 'Áo thun nữ', url: '/cua-hang/danh-muc/ao-thun-nu'},
                {label: 'Áo khoác nữ', url: '/cua-hang/danh-muc/ao-khoac-nu'},
                {label: 'Đồ lót nữ', url: '/cua-hang/danh-muc/do-lot-nu'},
                {label: 'Áo sơ mi nữ', url: '/cua-hang/danh-muc/ao-so-mi-nu'},
                {label: 'Áo thun teen', url: '/cua-hang/danh-muc/ao-thun-teen'},
                {label: 'Quần nữ', url: '/cua-hang/danh-muc/quan-nu'},
                {label: 'Quần jeans nữ', url: '/cua-hang/danh-muc/quan-jeans-nu'},
                {label: 'Áo dài cách tân', url: '/cua-hang/danh-muc/ao-dai-cach-tan'},
            ]},
            {label: 'Nước hoa', url: '/cua-hang/danh-muc/nuoc-hoa'},
        ]
    }},
    {label: 'Chính sách bán sỉ', url: '/blog/post/chinh-sach-ban-si'},
    {label: 'Sản phẩm đã lưu', url: '/cua-hang/danh-sach-san-pham-yeu-thich'},
];
