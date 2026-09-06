import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditClient } from './add-edit-client';

describe('AddEditClient', () => {
  let component: AddEditClient;
  let fixture: ComponentFixture<AddEditClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditClient],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditClient);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
