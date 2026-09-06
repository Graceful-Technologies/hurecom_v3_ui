import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamMembers } from './add-team-members';

describe('AddTeamMembers', () => {
  let component: AddTeamMembers;
  let fixture: ComponentFixture<AddTeamMembers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTeamMembers],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTeamMembers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
