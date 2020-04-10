import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MedkonnectLandingComponent } from './medkonnect-landing.component';
import { NeedppeComponent } from 'src/app/needppe/needppe.component';
import { HaveppeComponent } from 'src/app/haveppe/haveppe.component';

const routes = [
  { path: 'need', component: NeedppeComponent},
  { path: 'have', component: HaveppeComponent}
];

describe('MedkonnectLandingComponent', () => {
  let component: MedkonnectLandingComponent;
  let fixture: ComponentFixture<MedkonnectLandingComponent>;
  let router: Router;
  let loc: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        MedkonnectLandingComponent,
        NeedppeComponent,
        HaveppeComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedkonnectLandingComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    loc = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to given path when user clicks on Request/Provide ppe button', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.onRoute('have');
    expect(routerSpy).toHaveBeenCalledWith(['have']);
  });
});
