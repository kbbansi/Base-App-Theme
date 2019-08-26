import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingManagerProspectComponent } from './marketing-manager-prospect.component';

describe('MarketingManagerProspectComponent', () => {
  let component: MarketingManagerProspectComponent;
  let fixture: ComponentFixture<MarketingManagerProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingManagerProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingManagerProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
