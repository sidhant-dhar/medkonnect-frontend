import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaveppeComponent } from './haveppe.component';

describe('HaveppeComponent', () => {
  let component: HaveppeComponent;
  let fixture: ComponentFixture<HaveppeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaveppeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaveppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
