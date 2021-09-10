import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferVehicleComponent } from './transfer-vehicle.component';

describe('TransferVehicleComponent', () => {
  let component: TransferVehicleComponent;
  let fixture: ComponentFixture<TransferVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
