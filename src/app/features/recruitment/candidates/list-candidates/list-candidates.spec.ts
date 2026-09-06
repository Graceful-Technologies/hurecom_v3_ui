import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidates } from './list-candidates';

describe('ListCandidates', () => {
  let component: ListCandidates;
  let fixture: ComponentFixture<ListCandidates>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCandidates],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCandidates);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
