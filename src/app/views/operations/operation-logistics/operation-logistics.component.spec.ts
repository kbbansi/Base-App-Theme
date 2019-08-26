import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationLogisticsComponent } from './operation-logistics.component';

describe('OperationLogisticsComponent', () => {
  let component: OperationLogisticsComponent;
  let fixture: ComponentFixture<OperationLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
