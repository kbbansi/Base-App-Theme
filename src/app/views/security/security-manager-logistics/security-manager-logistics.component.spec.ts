import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityManagerLogisticsComponent } from './security-manager-logistics.component';

describe('SecurityManagerLogisticsComponent', () => {
  let component: SecurityManagerLogisticsComponent;
  let fixture: ComponentFixture<SecurityManagerLogisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityManagerLogisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityManagerLogisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
