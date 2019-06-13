import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
    {type: 'link', label: 'Trang chủ', url: '/'},
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

    // {type: 'link', label: 'Home', url: './', children: [
    //     {type: 'link', label: 'Home 1', url: '/classic'},
    //     {type: 'link', label: 'Home 2', url: '/compact'}
    // ]},

    // {type: 'link', label: 'Categories', url: '', children: [
    //     {type: 'link', label: 'Power Tools', url: '', children: [
    //         {type: 'link', label: 'Engravers',           url: ''},
    //         {type: 'link', label: 'Wrenches',            url: ''},
    //         {type: 'link', label: 'Wall Chaser',         url: ''},
    //         {type: 'link', label: 'Pneumatic Tools',     url: ''}
    //     ]},
    //     {type: 'link', label: 'Machine Tools', url: '', children: [
    //         {type: 'link', label: 'Thread Cutting',      url: ''},
    //         {type: 'link', label: 'Chip Blowers',        url: ''},
    //         {type: 'link', label: 'Sharpening Machines', url: ''},
    //         {type: 'link', label: 'Pipe Cutters',        url: ''},
    //         {type: 'link', label: 'Slotting machines',   url: ''},
    //         {type: 'link', label: 'Lathes',              url: ''}
    //     ]}
    // ]},

    // {type: 'link', label: 'Shop', url: './shop', children: [
    //     {type: 'link', label: 'Shop Grid', url: './shop', children: [
    //         {type: 'link', label: '3 Columns Sidebar',  url: './shop/category-grid-3-columns-sidebar'},
    //         {type: 'link', label: '4 Columns Full',     url: './shop/category-grid-4-columns-full'},
    //         {type: 'link', label: '5 Columns Full',     url: './shop/category-grid-5-columns-full'}
    //     ]},
    //     {type: 'link', label: 'Shop List',          url: './shop/category-list'},
    //     {type: 'link', label: 'Shop Right Sidebar', url: './shop/category-right-sidebar'},
    //     {type: 'link', label: 'Product',            url: './shop/product', children: [
    //         {type: 'link', label: 'Product',            url: './shop/product'},
    //         {type: 'link', label: 'Product Alt',        url: './shop/product-columnar'},
    //         {type: 'link', label: 'Product Sidebar',    url: './shop/product-sidebar'}
    //     ]},
    //     {type: 'link', label: 'Cart',        url: './shop/cart'},
    //     {type: 'link', label: 'Checkout',    url: './shop/checkout'},
    //     {type: 'link', label: 'Wishlist',    url: './shop/wishlist'},
    //     {type: 'link', label: 'Compare',     url: './shop/compare'},
    //     {type: 'link', label: 'Track Order', url: './shop/track-order'}
    // ]},

    // {type: 'link', label: 'Account', url: './account', children: [
    //     {type: 'link', label: 'Login',           url: './account/login'},
    //     {type: 'link', label: 'Dashboard',       url: './account/dashboard'},
    //     {type: 'link', label: 'Edit Profile',    url: './account/profile'},
    //     {type: 'link', label: 'Order History',   url: './account/orders'},
    //     {type: 'link', label: 'Address Book',    url: './account/addresses'},
    //     {type: 'link', label: 'Change Password', url: './account/password'}
    // ]},

    // {type: 'link', label: 'Blog', url: './blog', children: [
    //     {type: 'link', label: 'Blog Classic',         url: './blog/category-classic'},
    //     {type: 'link', label: 'Blog Grid',            url: './blog/category-grid'},
    //     {type: 'link', label: 'Blog List',            url: './blog/category-list'},
    //     {type: 'link', label: 'Blog Left Sidebar',    url: './blog/category-left-sidebar'},
    //     {type: 'link', label: 'Post Page',            url: './blog/post-classic'},
    //     {type: 'link', label: 'Post Without Sidebar', url: './blog/post-full'}
    // ]},

    // {type: 'link', label: 'Pages', url: './site', children: [
    //     {type: 'link', label: 'About Us',             url: './site/about-us'},
    //     {type: 'link', label: 'Contact Us',           url: './site/contact-us'},
    //     {type: 'link', label: 'Contact Us Alt',       url: './site/contact-us-alt'},
    //     {type: 'link', label: '404',                  url: './site/not-found'},
    //     {type: 'link', label: 'Terms And Conditions', url: './site/terms'},
    //     {type: 'link', label: 'FAQ',                  url: './site/faq'},
    //     {type: 'link', label: 'Components',           url: './site/components'},
    //     {type: 'link', label: 'Typography',           url: './site/typography'}
    // ]},

    // {type: 'button', label: 'Currency', children: [
    //     {type: 'button', label: '€ Euro',           data: {currency: 'EUR'}},
    //     {type: 'button', label: '£ Pound Sterling', data: {currency: 'GBP'}},
    //     {type: 'button', label: '$ US Dollar',      data: {currency: 'USD'}},
    //     {type: 'button', label: '₽ Russian Ruble',  data: {currency: 'RUB'}}
    // ]},

    // {type: 'button', label: 'Language', children: [
    //     {type: 'button', label: 'English', data: {language: 'EN'}},
    //     {type: 'button', label: 'French',  data: {language: 'FR'}},
    //     {type: 'button', label: 'German',  data: {language: 'DE'}},
    //     {type: 'button', label: 'Russian', data: {language: 'RU'}},
    //     {type: 'button', label: 'Italian', data: {language: 'IT'}}
    // ]}
];
