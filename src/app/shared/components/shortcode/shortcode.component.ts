import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shortcode',
  templateUrl: './shortcode.component.html',
  styleUrls: ['./shortcode.component.sass']
})
export class ShortcodeComponent implements OnInit {
  @Input() name: string;

  constructor() { 
    this.name = "";
  }

  ngOnInit() {
    console.log(this.name);
  }

}
