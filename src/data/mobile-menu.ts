import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
    {type: 'link', label: 'Trang chủ', url: '/'},
    {type: 'link', label: 'Hàng mới về', url: '/shop'},
    {type: 'button', label: 'Danh mục sản phẩm', children: [
        {type: 'link', label: 'Quần áo nam', url: '/category/quan-ao-nam', children: [
            {type: 'link', label: 'Set bộ nam', url: '/category/set-bo-nam'},
            {type: 'link', label: 'Áo thun nam', url: '/category/ao-thun-nam', children: [
                {type: 'link', label: 'Áo thun cá sấu',    url: '/category/ao-thun-ca-sau'},
                {type: 'link', label: 'Áo thun sọc ngang', url: '/category/ao-thun-soc-ngang'},
                {type: 'link', label: 'Áo thun thể thao',  url: '/category/ao-thun-the-thao'},
            ]},
            {type: 'link', label: 'Áo sơ mi nam', url: '/category/ao-so-mi-nam', children: [
                {type: 'link', label: 'Sơ mi nam VNXK',    url: '/category/ao-so-mi-nam-xuat-khau'},
                {type: 'link', label: 'Sơ mi nam Hàn Quốc', url: '/category/ao-so-mi-nam-han-quoc'},
            ]},
            {type: 'link', label: 'Áo khoác nam', url: '/category/ao-khoac-nam'},
            {type: 'link', label: 'Quần nam', url: '/category/quan-nam', children: [
                {type: 'link', label: 'Quần jeans nam',    url: '/category/quan-jeans-nam'},
                {type: 'link', label: 'Quần dài nam', url: '/category/quan-dai-nam'},
                {type: 'link', label: 'Quần short nam', url: '/category/quan-short-nam'},
            ]},
            {type: 'link', label: 'Quần lót nam', url: '/category/quan-lot-nam'},
        ]},
        {type: 'link', label: 'Quần áo nữ', url: '/category/quan-ao-nu', children: [
            {type: 'link', label: 'Váy đầm', url: '/category/vay-dam'},
            {type: 'link', label: 'Đồ bộ nữ', url: '/category/do-bo-nu'},
            {type: 'link', label: 'Áo thun nữ', url: '/category/ao-thun-nu'},
            {type: 'link', label: 'Áo khoác nữ', url: '/category/ao-khoac-nu'},
            {type: 'link', label: 'Đồ lót nữ', url: '/category/do-lot-nu'},
            {type: 'link', label: 'Áo sơ mi nữ', url: '/category/ao-so-mi-nu'},
            {type: 'link', label: 'Áo thun teen', url: '/category/ao-thun-teen'},
            {type: 'link', label: 'Quần nữ', url: '/category/quan-nu'},
            {type: 'link', label: 'Quần jeans nữ', url: '/category/quan-jeans-nu'},
            {type: 'link', label: 'Áo dài cách tân', url: '/category/ao-dai-cach-tan'},

        ]},
        {type: 'link', label: 'Nước hoa', url: '/category/nuoc-hoa'},
    ]},
    {type: 'button', label: 'Hướng dẫn khách mới', children: [
        {type: 'link', label: 'Cách up mẫu', url: '/blog/post/cach-up-mau'},
        {type: 'link', label: 'Cách đặt hàng', url: '/blog/post/huong-dan'},
        {type: 'link', label: 'Chính sách bán sỉ', url: '/blog/post/chinh-sach-ban-si'},
        {type: 'link', label: 'Chính sách đổi trả', url: '/blog/post/chinh-sach-doi-tra'},
        {type: 'link', label: 'Bảng size', url: '/blog/post/bang-size'},
        {type: 'link', label: 'Zalo xem hàng', url: '/blog/post/zalo-xem-hang'},
        {type: 'link', label: 'Phí vận chuyển', url: '/blog/post/chinh-sach-van-chuyen'},
    ]},
    {type: 'link', label: 'Thông báo', url: '/blog'},
    {type: 'link', label: 'Thông tin liên hệ', url: '/blog/post/lien-he'},
];
