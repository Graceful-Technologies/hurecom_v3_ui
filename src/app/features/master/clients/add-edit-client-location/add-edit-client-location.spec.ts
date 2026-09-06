import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClientLocation } from './add-edit-client-location';

describe('AddEditClientLocation', () => {
  let component: AddEditClientLocation;
  let fixture: ComponentFixture<AddEditClientLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditClientLocation],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditClientLocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
