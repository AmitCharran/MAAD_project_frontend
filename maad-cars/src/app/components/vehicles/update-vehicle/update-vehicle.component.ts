import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import * as global from 'src/app/global';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.css']
})
export class UpdateVehicleComponent implements OnInit {
  vehicle?: Vehicle;
  color?: string;
  description?: string;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getVehicle();
  }

  getVehicle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.findVehicleById(id)
      .subscribe(vehicle => {
        this.vehicle = vehicle;
      });
  }

  submitUpdate() {
    if (global.current_user_id !== this.vehicle?.user.user_id) {
      this.router.navigateByUrl("/vehicles");
    }
    this.vehicle!.color = this.color!;
    this.vehicle!.description = this.description!;
    this.vehicleService.updateVehicle(this.vehicle!)
      .subscribe(vehicle => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.router.navigateByUrl(`/vehicles/detail/${id}`);
      });
  }

  goBack(): void {
    this.location.back();
  }

  backToMyVehicles(): void {
    this.router.navigateByUrl("/vehicles");
  }

  
}
