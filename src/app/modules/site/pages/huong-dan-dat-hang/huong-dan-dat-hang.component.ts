import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';


@Component({
  selector: 'app-huong-dan-dat-hang',
  templateUrl: './huong-dan-dat-hang.component.html',
  styleUrls: ['./huong-dan-dat-hang.component.sass']
})
export class HuongDanDatHangComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Hướng dẫn đặt hàng');
  }

}
