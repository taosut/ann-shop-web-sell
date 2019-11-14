import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';


@Component({
  selector: 'app-chinh-sach-ban-si',
  templateUrl: './chinh-sach-ban-si.component.html',
  styleUrls: ['./chinh-sach-ban-si.component.sass']
})
export class ChinhSachBanSiComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Chính sách bán sỉ');
  }

}
