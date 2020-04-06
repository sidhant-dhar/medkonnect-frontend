import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedkonnectLandingComponent } from './medkonnect-landing.component';

describe('MedkonnectLandingComponent', () => {
  let component: MedkonnectLandingComponent;
  let fixture: ComponentFixture<MedkonnectLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedkonnectLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedkonnectLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
