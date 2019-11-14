import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';


@Component({
  selector: 'app-danh-muc-san-pham',
  templateUrl: './danh-muc-san-pham.component.html',
  styleUrls: ['./danh-muc-san-pham.component.sass']
})
export class DanhMucSanPhamComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Danh mục sản phẩm');
  }

}
