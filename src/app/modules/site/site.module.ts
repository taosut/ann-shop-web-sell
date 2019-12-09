// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANN Shop
// modules
import { SharedModule } from '../../shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';
// components
import { ChinhSachBanSiComponent } from './pages/chinh-sach-ban-si/chinh-sach-ban-si.component';
import { DanhMucSanPhamComponent } from './pages/danh-muc-san-pham/danh-muc-san-pham.component';
import { GioiThieuComponent } from './pages/gioi-thieu/gioi-thieu.component';
import { HuongDanDatHangComponent } from './pages/huong-dan-dat-hang/huong-dan-dat-hang.component';
import { LienHeComponent } from './pages/lien-he/lien-he.component';
import { ThongBaoComponent } from './pages/thong-bao/thong-bao.component';
import { ZaloXemHangComponent } from './pages/zalo-xem-hang/zalo-xem-hang.component';
import { LixiComponent } from './pages/lixi/lixi.component';


@NgModule({
  declarations: [
    // pages
    DanhMucSanPhamComponent,
    LienHeComponent,
    HuongDanDatHangComponent,
    ZaloXemHangComponent,
    ChinhSachBanSiComponent,
    ThongBaoComponent,
    GioiThieuComponent,
    LixiComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
