import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidate } from './edit-candidate';

describe('EditCandidate', () => {
  let component: EditCandidate;
  let fixture: ComponentFixture<EditCandidate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCandidate],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCandidate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
