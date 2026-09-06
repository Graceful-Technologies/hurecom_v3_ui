import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientSpocs } from './list-client-spocs';

describe('ListClientSpocs', () => {
  let component: ListClientSpocs;
  let fixture: ComponentFixture<ListClientSpocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientSpocs],
    }).compileComponents();

    fixture = TestBed.createComponent(ListClientSpocs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
