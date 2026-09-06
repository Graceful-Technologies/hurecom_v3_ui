import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobDetails } from './view-job-details';

describe('ViewJobDetails', () => {
  let component: ViewJobDetails;
  let fixture: ComponentFixture<ViewJobDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJobDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewJobDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
