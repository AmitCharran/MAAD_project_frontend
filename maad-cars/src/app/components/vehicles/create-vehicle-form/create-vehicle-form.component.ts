import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-vehicle-form',
  templateUrl: './create-vehicle-form.component.html',
  styleUrls: ['./create-vehicle-form.component.css']
})
export class CreateVehicleFormComponent implements OnInit {
  vin: string;

  constructor() { }

  ngOnInit(): void {
  }

}
