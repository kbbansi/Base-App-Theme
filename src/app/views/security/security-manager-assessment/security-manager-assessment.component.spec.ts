import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityManagerAssessmentComponent } from './security-manager-assessment.component';

describe('SecurityManagerAssessmentComponent', () => {
  let component: SecurityManagerAssessmentComponent;
  let fixture: ComponentFixture<SecurityManagerAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityManagerAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityManagerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
