import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearenrsPerBookComponent } from './learenrs-per-book.component';

describe('LearenrsPerBookComponent', () => {
  let component: LearenrsPerBookComponent;
  let fixture: ComponentFixture<LearenrsPerBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearenrsPerBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearenrsPerBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
