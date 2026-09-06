import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientLocations } from './list-client-locations';

describe('ListClientLocations', () => {
  let component: ListClientLocations;
  let fixture: ComponentFixture<ListClientLocations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClientLocations],
    }).compileComponents();

    fixture = TestBed.createComponent(ListClientLocations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
