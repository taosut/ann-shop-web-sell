// Angular
import { Component, OnInit } from '@angular/core';

// ANN Shop
// Data Hard
import { categories } from '../../../data/shop-block-categories';
// Service
import { TitleService } from '../../shared/services/title.service';
import { LoadingSpinnerService } from '../../shared/services/loading-spinner.service';


@Component({
  selector: 'app-page-home-two',
  templateUrl: './page-home-two.component.html',
  styleUrls: ['./page-home-two.component.scss']
})
export class PageHomeTwoComponent implements OnInit {
  private loading1: boolean;
  private loading2: boolean;
  private loading3: boolean;
  private loading4: boolean;
  private loading5: boolean;
  private loading6: boolean;
  private loading7: boolean;
  private loading8: boolean;

  categories: any;

  constructor(private titleService: TitleService, private loadingSpinner: LoadingSpinnerService) {
    this.loading1 = false;
    this.loading2 = false;
    this.loading3 = false;
    this.loading4 = false;
    this.loading5 = false;
    this.loading6 = false;
    this.loading7 = false;
    this.loading8 = false;

    this.categories = categories;
  }

  ngOnInit() {
    this.titleService.setTitle();
    this.startLoading();
  }

  private startLoading() {
    this.loading1 = true;
    this.loading2 = true;
    this.loading3 = true;
    this.loading4 = true;
    this.loading5 = true;
    this.loading6 = true;
    this.loading7 = true;
    this.loading8 = true;

    this.loadingSpinner.show();
  }

  private finishLoading() {
    if (!this.loading1 && !this.loading2 && !this.loading3 && !this.loading4 && !this.loading5 && !this.loading6 && !this.loading7 && !this.loading8)
      this.loadingSpinner.close();
  }

  loadingBlockProduct1(value: boolean) {
    this.loading1 = value;
    this.finishLoading();
  }

  loadingBlockProduct2(value: boolean) {
    this.loading2 = value;
    this.finishLoading();
  }

  loadingBlockProduct3(value: boolean) {
    this.loading3 = value;
    this.finishLoading();
  }

  loadingBlockProduct4(value: boolean) {
    this.loading4 = value;
    this.finishLoading();
  }

  loadingBlockProduct5(value: boolean) {
    this.loading5 = value;
    this.finishLoading();
  }

  loadingBlockProduct6(value: boolean) {
    this.loading6 = value;
    this.finishLoading();
  }

  loadingBlockProduct7(value: boolean) {
    this.loading7 = value;
    this.finishLoading();
  }

  loadingBlockProduct8(value: boolean) {
    this.loading8 = value;
    this.finishLoading();
  }
}
