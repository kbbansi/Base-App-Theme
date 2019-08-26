import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationProspectComponent } from './operation-prospect.component';

describe('OperationProspectComponent', () => {
  let component: OperationProspectComponent;
  let fixture: ComponentFixture<OperationProspectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationProspectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
