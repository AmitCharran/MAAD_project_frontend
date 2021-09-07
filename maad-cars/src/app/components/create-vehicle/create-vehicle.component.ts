import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import * as global from '../../global';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
  }

}
