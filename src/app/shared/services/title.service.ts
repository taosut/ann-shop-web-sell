import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title: Title) { }

  setTitle(newTitle: string = '') {
    if (newTitle)
      this.title.setTitle(`${newTitle} - Xưởng sỉ ANN`);
    else
      this.title.setTitle('Xưởng sỉ ANN');
  }
}
