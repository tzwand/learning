import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerDetailsComponent } from './learner-details.component';

describe('LearnerDetailsComponent', () => {
  let component: LearnerDetailsComponent;
  let fixture: ComponentFixture<LearnerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
