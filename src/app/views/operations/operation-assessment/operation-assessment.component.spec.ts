import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationAssessmentComponent } from './operation-assessment.component';

describe('OperationAssessmentComponent', () => {
  let component: OperationAssessmentComponent;
  let fixture: ComponentFixture<OperationAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
