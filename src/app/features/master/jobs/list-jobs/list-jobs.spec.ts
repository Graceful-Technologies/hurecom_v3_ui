import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobs } from './list-jobs';

describe('ListJobs', () => {
  let component: ListJobs;
  let fixture: ComponentFixture<ListJobs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJobs],
    }).compileComponents();

    fixture = TestBed.createComponent(ListJobs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
