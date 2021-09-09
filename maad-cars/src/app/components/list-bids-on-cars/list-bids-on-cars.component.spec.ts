import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBidsOnCarsComponent } from './list-bids-on-cars.component';

describe('ListBidsOnCarsComponent', () => {
  let component: ListBidsOnCarsComponent;
  let fixture: ComponentFixture<ListBidsOnCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBidsOnCarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBidsOnCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
