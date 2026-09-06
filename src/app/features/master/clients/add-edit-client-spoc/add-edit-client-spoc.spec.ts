import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClientSpoc } from './add-edit-client-spoc';

describe('AddEditClientSpoc', () => {
  let component: AddEditClientSpoc;
  let fixture: ComponentFixture<AddEditClientSpoc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditClientSpoc],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditClientSpoc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
