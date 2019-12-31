import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLearnersComponent } from './dashboard-learners.component';

describe('DashboardLearnersComponent', () => {
  let component: DashboardLearnersComponent;
  let fixture: ComponentFixture<DashboardLearnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLearnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLearnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
