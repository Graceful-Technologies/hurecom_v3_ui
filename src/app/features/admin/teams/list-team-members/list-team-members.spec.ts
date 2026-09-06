import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTeamMembers } from './list-team-members';

describe('ListTeamMembers', () => {
  let component: ListTeamMembers;
  let fixture: ComponentFixture<ListTeamMembers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTeamMembers],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTeamMembers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
