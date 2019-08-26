import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockbalanceComponent } from './stockbalance.component';

describe('StockbalanceComponent', () => {
  let component: StockbalanceComponent;
  let fixture: ComponentFixture<StockbalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockbalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
