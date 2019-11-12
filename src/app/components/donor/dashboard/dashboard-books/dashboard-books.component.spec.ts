import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBooksComponent } from './dashboard-books.component';

describe('DashboardBooksComponent', () => {
  let component: DashboardBooksComponent;
  let fixture: ComponentFixture<DashboardBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
