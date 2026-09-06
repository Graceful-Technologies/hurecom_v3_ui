import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommission } from './update-commission';

describe('UpdateCommission', () => {
  let component: UpdateCommission;
  let fixture: ComponentFixture<UpdateCommission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCommission],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCommission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
