import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleInputMakeComponent } from './create-vehicle-input-make.component';

describe('CreateVehicleInputMakeComponent', () => {
  let component: CreateVehicleInputMakeComponent;
  let fixture: ComponentFixture<CreateVehicleInputMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVehicleInputMakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVehicleInputMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
