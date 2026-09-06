import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTeam } from './add-edit-team';

describe('AddEditTeam', () => {
  let component: AddEditTeam;
  let fixture: ComponentFixture<AddEditTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
