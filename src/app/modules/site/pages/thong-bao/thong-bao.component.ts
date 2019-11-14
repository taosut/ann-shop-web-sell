import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';


@Component({
  selector: 'app-thong-bao',
  templateUrl: './thong-bao.component.html',
  styleUrls: ['./thong-bao.component.sass']
})
export class ThongBaoComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Thông báo');
  }

}
