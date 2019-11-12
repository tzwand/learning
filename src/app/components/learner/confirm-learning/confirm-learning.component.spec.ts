import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLearningComponent } from './confirm-learning.component';

describe('ConfirmLearningComponent', () => {
  let component: ConfirmLearningComponent;
  let fixture: ComponentFixture<ConfirmLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
