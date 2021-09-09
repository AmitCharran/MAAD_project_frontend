import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-vehicle-form',
  templateUrl: './create-vehicle-form.component.html',
  styleUrls: ['./create-vehicle-form.component.css']
})
export class CreateVehicleFormComponent implements OnInit {
  vin?: string;
  color?: string;
  description?: string;
  @Output() formEmitter = new EventEmitter<Object>();

  constructor() { }

  ngOnInit(): void {
  }

  acceptForm(): void {
    let form = {
      vin: this.vin,
      color: this.color,
      description: this.description
    }
    console.log(`Emitted: ${form}`);
    this.formEmitter.emit(form);
  }
}