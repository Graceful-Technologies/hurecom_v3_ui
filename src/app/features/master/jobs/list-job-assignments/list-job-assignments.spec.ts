import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobAssignments } from './list-job-assignments';

describe('ListJobAssignments', () => {
  let component: ListJobAssignments;
  let fixture: ComponentFixture<ListJobAssignments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJobAssignments],
    }).compileComponents();

    fixture = TestBed.createComponent(ListJobAssignments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
