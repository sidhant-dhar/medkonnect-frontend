import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedkonnectAboutusComponent } from './medkonnect-aboutus.component';

describe('MedkonnectAboutusComponent', () => {
  let component: MedkonnectAboutusComponent;
  let fixture: ComponentFixture<MedkonnectAboutusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedkonnectAboutusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedkonnectAboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
