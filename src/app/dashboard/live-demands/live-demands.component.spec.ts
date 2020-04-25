import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDemandsComponent } from './live-demands.component';

describe('LiveDemandsComponent', () => {
  let component: LiveDemandsComponent;
  let fixture: ComponentFixture<LiveDemandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveDemandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDemandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
