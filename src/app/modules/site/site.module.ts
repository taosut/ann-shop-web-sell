// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANN Shop
// modules
import { SiteRoutingModule } from './site-routing.module';
// components
import { DanhMucSanPhamComponent } from './pages/danh-muc-san-pham/danh-muc-san-pham.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LienHeComponent } from './pages/lien-he/lien-he.component';
import { HuongDanDatHangComponent } from './pages/huong-dan-dat-hang/huong-dan-dat-hang.component';
import { ZaloXemHangComponent } from './pages/zalo-xem-hang/zalo-xem-hang.component';
import { ChinhSachBanSiComponent } from './pages/chinh-sach-ban-si/chinh-sach-ban-si.component';
import { ThongBaoComponent } from './pages/thong-bao/thong-bao.component';
import { GioiThieuComponent } from './pages/gioi-thieu/gioi-thieu.component';


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
  ],
  imports: [
    CommonModule,
    SharedModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
