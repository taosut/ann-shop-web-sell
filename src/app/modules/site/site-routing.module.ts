// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DanhMucSanPhamComponent } from './pages/danh-muc-san-pham/danh-muc-san-pham.component';
import { LienHeComponent } from './pages/lien-he/lien-he.component';
import { HuongDanDatHangComponent } from './pages/huong-dan-dat-hang/huong-dan-dat-hang.component';
import { ZaloXemHangComponent } from './pages/zalo-xem-hang/zalo-xem-hang.component';
import { ChinhSachBanSiComponent } from './pages/chinh-sach-ban-si/chinh-sach-ban-si.component';
import { ThongBaoComponent } from './pages/thong-bao/thong-bao.component';
import { GioiThieuComponent } from './pages/gioi-thieu/gioi-thieu.component';
import { LixiComponent } from './pages/lixi/lixi.component';

// ANN Shop
// components


const routes: Routes = [
  {
    path: 'danh-muc-san-pham',
    component: DanhMucSanPhamComponent
  },
  {
    path: 'gioi-thieu',
    component: GioiThieuComponent
  },
  {
    path: 'lien-he',
    component: LienHeComponent
  },
  {
    path: 'thong-bao',
    component: ThongBaoComponent
  },
  {
    path: 'huong-dan-dat-hang',
    component: HuongDanDatHangComponent
  },
  {
    path: 'chinh-sach-ban-si',
    component: ChinhSachBanSiComponent
  },
  {
    path: 'zalo-xem-hang',
    component: ZaloXemHangComponent
  },
  {
    path: 'lixi',
    component: LixiComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
