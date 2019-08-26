import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityManagerProjectComponent } from './security-manager-project.component';

describe('SecurityManagerProjectComponent', () => {
  let component: SecurityManagerProjectComponent;
  let fixture: ComponentFixture<SecurityManagerProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityManagerProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityManagerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
