import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDetailsTab } from './resume-details-tab';

describe('ResumeDetailsTab', () => {
  let component: ResumeDetailsTab;
  let fixture: ComponentFixture<ResumeDetailsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeDetailsTab],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeDetailsTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
