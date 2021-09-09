import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleInputModelComponent } from './create-vehicle-input-model.component';

describe('CreateVehicleInputModelComponent', () => {
  let component: CreateVehicleInputModelComponent;
  let fixture: ComponentFixture<CreateVehicleInputModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVehicleInputModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVehicleInputModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
