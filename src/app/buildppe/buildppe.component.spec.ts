import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildppeComponent } from './buildppe.component';

describe('BuildppeComponent', () => {
  let component: BuildppeComponent;
  let fixture: ComponentFixture<BuildppeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildppeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
