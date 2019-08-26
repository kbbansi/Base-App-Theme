import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationManagerProspectComponent } from './operation-manager-prospect.component';

describe('OperationManagerProspectComponent', () => {
  let component: OperationManagerProspectComponent;
  let fixture: ComponentFixture<OperationManagerProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationManagerProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationManagerProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
