// Angular
import { Component, OnInit } from '@angular/core';

// ANN Shop
// Data Hard
import { categories } from '../../../data/shop-block-categories';
// Service
import { LoadingSpinnerService } from 'src/app/shared/services/loading-spinner.service';


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

  categories: any;

  constructor(private loadingSpinner: LoadingSpinnerService) {
    this.loading1 = false;
    this.loading2 = false;
    this.loading3 = false;
    this.loading4 = false;
    this.loading5 = false;

    this.categories = categories
  }

  ngOnInit() {
    this.startLoading();
  }

  private startLoading() {
    this.loading1 = true;
    this.loading2 = true;
    this.loading3 = true;
    this.loading4 = true;
    this.loading5 = true;

    this.loadingSpinner.show();
  }

  private finishLoading() {
    if (!this.loading1 && !this.loading2 && !this.loading3 && !this.loading4 && !this.loading5)
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
}
