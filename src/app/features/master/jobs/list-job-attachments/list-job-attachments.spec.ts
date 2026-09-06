import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJobAttachments } from './list-job-attachments';

describe('ListJobAttachments', () => {
  let component: ListJobAttachments;
  let fixture: ComponentFixture<ListJobAttachments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListJobAttachments],
    }).compileComponents();

    fixture = TestBed.createComponent(ListJobAttachments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
