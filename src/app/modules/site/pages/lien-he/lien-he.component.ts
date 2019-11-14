import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';


@Component({
  selector: 'app-lien-he',
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.sass']
})
export class LienHeComponent implements OnInit {
  
  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Thông tin liên hệ');
  }

}
