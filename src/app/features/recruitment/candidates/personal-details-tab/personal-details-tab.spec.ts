import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsTab } from './personal-details-tab';

describe('PersonalDetailsTab', () => {
  let component: PersonalDetailsTab;
  let fixture: ComponentFixture<PersonalDetailsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDetailsTab],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalDetailsTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
