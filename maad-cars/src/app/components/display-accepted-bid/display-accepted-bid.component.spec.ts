import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAcceptedBidComponent } from './display-accepted-bid.component';

describe('DisplayAcceptedBidComponent', () => {
  let component: DisplayAcceptedBidComponent;
  let fixture: ComponentFixture<DisplayAcceptedBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAcceptedBidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAcceptedBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
