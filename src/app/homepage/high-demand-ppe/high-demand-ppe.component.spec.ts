import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighDemandPpeComponent } from './high-demand-ppe.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NeedppeComponent } from 'src/app/needppe/needppe.component';
import { HaveppeComponent } from 'src/app/haveppe/haveppe.component';

describe('HighDemandPpeComponent', () => {
  let component: HighDemandPpeComponent;
  let fixture: ComponentFixture<HighDemandPpeComponent>;
  let router: Router;
  let loc: Location;

  const routes = [
    { path: 'need', component: NeedppeComponent},
    { path: 'have', component: HaveppeComponent}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        HighDemandPpeComponent,
        NeedppeComponent,
        HaveppeComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighDemandPpeComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    loc = TestBed.get(Location);
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
