import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedppeComponent } from './needppe.component';

describe('NeedppeComponent', () => {
  let component: NeedppeComponent;
  let fixture: ComponentFixture<NeedppeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedppeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
