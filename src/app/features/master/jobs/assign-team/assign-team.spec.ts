import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTeam } from './assign-team';

describe('AssignTeam', () => {
  let component: AssignTeam;
  let fixture: ComponentFixture<AssignTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignTeam],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignTeam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
