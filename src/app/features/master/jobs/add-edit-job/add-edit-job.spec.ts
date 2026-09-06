import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJob } from './add-edit-job';

describe('AddEditJob', () => {
  let component: AddEditJob;
  let fixture: ComponentFixture<AddEditJob>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditJob],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditJob);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
