import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelagentsComponent } from './travelagents.component';

describe('TravelagentsComponent', () => {
  let component: TravelagentsComponent;
  let fixture: ComponentFixture<TravelagentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelagentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelagentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
