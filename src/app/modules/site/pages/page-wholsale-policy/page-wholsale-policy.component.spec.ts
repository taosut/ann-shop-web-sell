import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWholsalePolicyComponent } from './page-wholsale-policy.component';

describe('PageWholsalePolicyComponent', () => {
  let component: PageWholsalePolicyComponent;
  let fixture: ComponentFixture<PageWholsalePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageWholsalePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWholsalePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
