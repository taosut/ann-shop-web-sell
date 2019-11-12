import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shortcode',
  templateUrl: './shortcode.component.html',
  styleUrls: ['./shortcode.component.sass']
})
export class ShortcodeComponent {
  @Input() name: string;

  constructor() {
    this.name = "";
  }

}
