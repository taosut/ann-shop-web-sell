import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDeliveryPolicyComponent } from './page-delivery-policy.component';

describe('PageDeliveryPolicyComponent', () => {
  let component: PageDeliveryPolicyComponent;
  let fixture: ComponentFixture<PageDeliveryPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDeliveryPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDeliveryPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
