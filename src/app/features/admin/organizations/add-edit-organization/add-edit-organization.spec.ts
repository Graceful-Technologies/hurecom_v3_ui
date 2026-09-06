import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrganization } from './add-edit-organization';

describe('AddEditOrganization', () => {
  let component: AddEditOrganization;
  let fixture: ComponentFixture<AddEditOrganization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditOrganization],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditOrganization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
