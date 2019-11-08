import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
    {type: 'link', label: 'Trang chủ', url: '/'},
    {type: 'link', label: 'Hàng mới về', url: '/cua-hang'},
    {type: 'button', label: 'Danh mục sản phẩm', children: [
        {type: 'link', label: 'Quần áo nam', url: '/cua-hang/danh-muc/quan-ao-nam', children: [
            {type: 'link', label: 'Set bộ nam', url: '/cua-hang/danh-muc/set-bo-nam'},
            {type: 'link', label: 'Áo thun nam', url: '/cua-hang/danh-muc/ao-thun-nam', children: [
                {type: 'link', label: 'Áo thun cá sấu',    url: '/cua-hang/danh-muc/ao-thun-ca-sau'},
                {type: 'link', label: 'Áo thun sọc ngang', url: '/cua-hang/danh-muc/ao-thun-soc-ngang'},
                {type: 'link', label: 'Áo thun thể thao',  url: '/cua-hang/danh-muc/ao-thun-the-thao'},
            ]},
            {type: 'link', label: 'Áo sơ mi nam', url: '/cua-hang/danh-muc/ao-so-mi-nam', children: [
                {type: 'link', label: 'Sơ mi nam VNXK',    url: '/cua-hang/danh-muc/ao-so-mi-nam-xuat-khau'},
                {type: 'link', label: 'Sơ mi nam Hàn Quốc', url: '/cua-hang/danh-muc/ao-so-mi-nam-han-quoc'},
            ]},
            {type: 'link', label: 'Áo khoác nam', url: '/cua-hang/danh-muc/ao-khoac-nam'},
            {type: 'link', label: 'Quần nam', url: '/cua-hang/danh-muc/quan-nam', children: [
                {type: 'link', label: 'Quần jeans nam',    url: '/cua-hang/danh-muc/quan-jeans-nam'},
                {type: 'link', label: 'Quần dài nam', url: '/cua-hang/danh-muc/quan-dai-nam'},
                {type: 'link', label: 'Quần short nam', url: '/cua-hang/danh-muc/quan-short-nam'},
            ]},
            {type: 'link', label: 'Quần lót nam', url: '/cua-hang/danh-muc/quan-lot-nam'},
        ]},
        {type: 'link', label: 'Quần áo nữ', url: '/cua-hang/danh-muc/quan-ao-nu', children: [
            {type: 'link', label: 'Váy đầm', url: '/cua-hang/danh-muc/vay-dam'},
            {type: 'link', label: 'Đồ bộ nữ', url: '/cua-hang/danh-muc/do-bo-nu'},
            {type: 'link', label: 'Áo thun nữ', url: '/cua-hang/danh-muc/ao-thun-nu'},
            {type: 'link', label: 'Áo khoác nữ', url: '/cua-hang/danh-muc/ao-khoac-nu'},
            {type: 'link', label: 'Đồ lót nữ', url: '/cua-hang/danh-muc/do-lot-nu'},
            {type: 'link', label: 'Áo sơ mi nữ', url: '/cua-hang/danh-muc/ao-so-mi-nu'},
            {type: 'link', label: 'Áo thun teen', url: '/cua-hang/danh-muc/ao-thun-teen'},
            {type: 'link', label: 'Quần nữ', url: '/cua-hang/danh-muc/quan-nu'},
            {type: 'link', label: 'Quần jeans nữ', url: '/cua-hang/danh-muc/quan-jeans-nu'},
            {type: 'link', label: 'Áo dài cách tân', url: '/cua-hang/danh-muc/ao-dai-cach-tan'},
            
        ]},
        {type: 'link', label: 'Nước hoa', url: '/cua-hang/danh-muc/nuoc-hoa'},
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
