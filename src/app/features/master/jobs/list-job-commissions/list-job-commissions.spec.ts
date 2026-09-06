import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobCommissions } from './list-job-commissions';

describe('ListJobCommissions', () => {
  let component: ListJobCommissions;
  let fixture: ComponentFixture<ListJobCommissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJobCommissions],
    }).compileComponents();

    fixture = TestBed.createComponent(ListJobCommissions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
