import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidsOnCarComponent } from './bids-on-car.component';

describe('BidsOnCarComponent', () => {
  let component: BidsOnCarComponent;
  let fixture: ComponentFixture<BidsOnCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidsOnCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidsOnCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
