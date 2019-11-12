import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerEventDetailsComponent } from './learner-event-details.component';

describe('LearnerEventDetailsComponent', () => {
  let component: LearnerEventDetailsComponent;
  let fixture: ComponentFixture<LearnerEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
