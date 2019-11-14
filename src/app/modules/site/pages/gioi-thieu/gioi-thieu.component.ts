import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';


@Component({
  selector: 'app-gioi-thieu',
  templateUrl: './gioi-thieu.component.html',
  styleUrls: ['./gioi-thieu.component.sass']
})
export class GioiThieuComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Giới thiệu');
  }

}
