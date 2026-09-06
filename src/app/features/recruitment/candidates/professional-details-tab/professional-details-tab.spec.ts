import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalDetailsTab } from './professional-details-tab';

describe('ProfessionalDetailsTab', () => {
  let component: ProfessionalDetailsTab;
  let fixture: ComponentFixture<ProfessionalDetailsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalDetailsTab],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalDetailsTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
