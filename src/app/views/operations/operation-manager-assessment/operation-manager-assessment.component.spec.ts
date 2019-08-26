import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationManagerAssessmentComponent } from './operation-manager-assessment.component';

describe('OperationManagerAssessmentComponent', () => {
  let component: OperationManagerAssessmentComponent;
  let fixture: ComponentFixture<OperationManagerAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationManagerAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationManagerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
