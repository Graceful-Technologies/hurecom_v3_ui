import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobOpenings } from './list-job-openings';

describe('ListJobOpenings', () => {
  let component: ListJobOpenings;
  let fixture: ComponentFixture<ListJobOpenings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJobOpenings],
    }).compileComponents();

    fixture = TestBed.createComponent(ListJobOpenings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
