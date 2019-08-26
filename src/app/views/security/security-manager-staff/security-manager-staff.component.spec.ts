import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityManagerStaffComponent } from './security-manager-staff.component';

describe('SecurityManagerStaffComponent', () => {
  let component: SecurityManagerStaffComponent;
  let fixture: ComponentFixture<SecurityManagerStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityManagerStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityManagerStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
