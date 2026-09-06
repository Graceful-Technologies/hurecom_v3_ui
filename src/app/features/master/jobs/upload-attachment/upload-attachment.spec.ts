import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAttachment } from './upload-attachment';

describe('UploadAttachment', () => {
  let component: UploadAttachment;
  let fixture: ComponentFixture<UploadAttachment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAttachment],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadAttachment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
