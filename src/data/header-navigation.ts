import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Trang chủ', url: '/'},
    {label: 'Hàng mới về', url:'/shop', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam', url: '/shop/category/1'},
            {label: 'Quần áo nữ', url: '/shop/category/15'}
        ] 
    }},
    {label: 'Danh mục sản phẩm', url:'/blog/post/danh-muc-san-pham', menu: {
        type: 'menu',
        items: [
            {label: 'Quần áo nam', url: '/shop/category/1', items: [
                {label: 'Set bộ nam', url: '/shop/category/2'},
                {label: 'Áo thun nam', url: '/shop/category/3'},
                {label: 'Áo thun cá sấu',    url: '/shop/category/4'},
                {label: 'Áo thun sọc ngang', url: '/shop/category/5'},
                {label: 'Áo thun thể thao',  url: '/shop/category/6'},
                {label: 'Áo sơ mi nam', url: '/shop/category/7'},
                {label: 'Sơ mi nam VNXK',    url: '/shop/category/8'},
                {label: 'Sơ mi nam Hàn Quốc', url: '/shop/category/9'},
                {label: 'Áo khoác nam', url: '/shop/category/10'},
                {label: 'Quần nam', url: '/shop/category/11'},
                {label: 'Quần jeans nam',    url: '/shop/category/12'},
                {label: 'Quần dài nam', url: '/shop/category/13'},
                {label: 'Quần short nam', url: '/shop/category/14'},
                {label: 'Quần lót nam', url: '/shop/category/42'},
            ]},
            {label: 'Quần áo nữ', url: '/shop/category/15', items: [
                {label: 'Váy đầm', url: '/shop/category/17'},
                {label: 'Đồ bộ nữ', url: '/shop/category/18'},
                {label: 'Áo thun nữ', url: '/shop/category/19'},
                {label: 'Áo khoác nữ', url: '/shop/category/21'},
                {label: 'Đồ lót nữ', url: '/shop/category/41'},
                {label: 'Áo sơ mi nữ', url: '/shop/category/20'},
                {label: 'Áo thun teen', url: '/shop/category/22'},
                {label: 'Quần nữ', url: '/shop/category/23'},
                {label: 'Quần jean nữ', url: '/shop/category/24'},
                {label: 'Áo dài cách tân nữ', url: '/shop/category/16'},
            ]},
            {label: 'Nước hoa', url: '/shop/category/44'},
        ] 
    }},
    {label: 'Chính sách bán sỉ', url: '/blog/post/chinh-sach-ban-si'},
    {label: 'Sản phẩm đã lưu', url: '/shop/wishlist'},
];
