import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksForLearnerComponent } from './books-for-learner.component';

describe('BooksForLearnerComponent', () => {
  let component: BooksForLearnerComponent;
  let fixture: ComponentFixture<BooksForLearnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksForLearnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksForLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
