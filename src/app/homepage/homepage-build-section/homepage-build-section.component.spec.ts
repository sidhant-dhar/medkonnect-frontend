import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageBuildSectionComponent } from './homepage-build-section.component';

describe('HomepageBuildSectionComponent', () => {
  let component: HomepageBuildSectionComponent;
  let fixture: ComponentFixture<HomepageBuildSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageBuildSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageBuildSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
