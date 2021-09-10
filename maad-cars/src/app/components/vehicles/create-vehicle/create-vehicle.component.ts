import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/model';
import { Make } from '../../../models/make';
import { Vehicle } from '../../../models/vehicle';
import * as global from '../../../global';
import { UserService } from 'src/app/services/user.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {
  make?: Make;
  model?: Model;
  vin?: string;
  color?: string;
  description?: string;
  vehicle?: Vehicle;

  insertHasFailed: boolean = false;

  constructor(
    private userService: UserService,
    private vehicleService: VehicleService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  unpackForm(form: any): void {
    this.vin = form?.vin?.toUpperCase();
    this.color = form?.color;
    this.description = form?.description;
    this.vehicle = {
      vehicle_id : 0,
      user : undefined!,
      model : this.model!,
      vin : this.vin!,
      color : this.color!,
      description : this.description!,
      _stolen : false
    }
  }

  async addVehicle() {
    this.insertHasFailed = false;
    //global.setCurrentUserId(1); // TODO: remove this line once login functionality is in
    console.log(global.current_user_id);
    await this.userService.getUserById(global.current_user_id).toPromise().then(user => {
      if (!user) {
        this.router.navigateByUrl('/');
      }
      console.log(user);
      this.vehicle!.user = user;
      this.vehicleService.createVehicle(this.vehicle!)
        .subscribe(vehicle => {
          if (vehicle) {
            this.router.navigateByUrl(`/vehicles/detail/${vehicle.vehicle_id}`);
          } else {
            this.insertHasFailed = true;
          }
        });
    });
  }

  backOneMenu(): void {
    if (this.vin || this.color || this.description || this.vehicle) {
      this.vin = undefined;
      this.color = undefined;
      this.description = undefined;
      this.vehicle = undefined;
      return;
    }
    if (this.model) {
      this.model = undefined;
      return;
    }
    this.make = undefined;
  }

  startOver(): void {
    this.vin = undefined;
    this.color = undefined;
    this.description = undefined;
    this.vehicle = undefined;
    this.model = undefined;
    this.make = undefined;
  }
}
