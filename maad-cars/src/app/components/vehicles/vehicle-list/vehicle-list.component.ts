import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../models/vehicle';
import { VehicleService } from '../../../services/vehicle.service';
import * as global from '../../../global';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  myVehicles: Vehicle[] = [];

  constructor(
    private vehicleService: VehicleService
  ) { }
  ngOnInit(): void {
    this.getMyVehicles();
  }

  getMyVehicles(): void {
    this.vehicleService.getAllVehicles()
    .subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      this.filterVehicles();
    });
  }

  filterVehicles(): void {
    this.myVehicles = [];
    for (let vehicle of this.vehicles) {
      console.log('filterVehicles() called');
      if (vehicle.user.user_id === global.current_user_id) {
        this.myVehicles.push(vehicle);
      }
    }
  }


}
