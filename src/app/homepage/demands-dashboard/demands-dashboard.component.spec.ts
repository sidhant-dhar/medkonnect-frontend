import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandsDashboardComponent } from './demands-dashboard.component';

describe('DemandsDashboardComponent', () => {
  let component: DemandsDashboardComponent;
  let fixture: ComponentFixture<DemandsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
