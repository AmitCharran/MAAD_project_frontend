import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.css']
})
export class MySalesComponent implements OnInit {
  vehicles: Vehicle[] = []
  myVehiclesOnSale: Vehicle[] = []
  constructor(private vehicleService: VehicleService) { }
  ngOnInit(): void {
    // this.getVehicles();
    // filter vehicles
    // reduce all vehicles for only current user
    // then reduce to only vehicles on sale
  }

}
