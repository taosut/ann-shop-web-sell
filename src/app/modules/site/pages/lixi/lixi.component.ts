import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../../shared/services/title.service';

@Component({
  selector: 'app-lixi',
  templateUrl: './lixi.component.html',
  styleUrls: ['./lixi.component.sass']
})
export class LixiComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.setTitle('Sỉ bao lì xì tết 2020');
  }

}
