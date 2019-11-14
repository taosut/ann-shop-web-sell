import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';


@Component({
  selector: 'app-zalo-xem-hang',
  templateUrl: './zalo-xem-hang.component.html',
  styleUrls: ['./zalo-xem-hang.component.sass']
})
export class ZaloXemHangComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Zalo xem hàng');
  }

}
