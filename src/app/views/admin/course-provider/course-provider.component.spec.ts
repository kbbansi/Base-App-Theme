import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseProviderComponent } from './course-provider.component';

describe('CourseProviderComponent', () => {
  let component: CourseProviderComponent;
  let fixture: ComponentFixture<CourseProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
