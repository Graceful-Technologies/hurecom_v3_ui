import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganizations } from './list-organizations';

describe('ListOrganizations', () => {
  let component: ListOrganizations;
  let fixture: ComponentFixture<ListOrganizations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOrganizations],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOrganizations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
