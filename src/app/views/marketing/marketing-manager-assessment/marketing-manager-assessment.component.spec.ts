import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingManagerAssessmentComponent } from './marketing-manager-assessment.component';

describe('MarketingManagerAssessmentComponent', () => {
  let component: MarketingManagerAssessmentComponent;
  let fixture: ComponentFixture<MarketingManagerAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingManagerAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingManagerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
