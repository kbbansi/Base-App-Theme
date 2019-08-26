import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceOfficerLogisticsComponent } from './finance-officer-logistics.component';

describe('FinanceOfficerLogisticsComponent', () => {
  let component: FinanceOfficerLogisticsComponent;
  let fixture: ComponentFixture<FinanceOfficerLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceOfficerLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceOfficerLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
