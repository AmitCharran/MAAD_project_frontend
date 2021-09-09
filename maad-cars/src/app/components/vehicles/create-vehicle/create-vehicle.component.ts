import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/model';
import { Make } from '../../../models/make';
import { Vehicle } from '../../../models/vehicle';
import { User } from '../../../models/user';
import * as global from '../../../global';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  unpackForm(form: any): void {
    this.vin = form?.vin;
    this.color = form?.color;
    this.description = form?.description;
  }

  async test() {
    global.setCurrentUserId(1);
    let currentUser: User;
    await this.userService.getUserById(global.current_user_id).toPromise().then(user => {
      currentUser = user;
      let vehicle: Vehicle = {
        vehicle_id : 0,
        user : currentUser,
        model : this.model!,
        vin : this.vin!,
        color : this.color!,
        description : this.description!,
        is_stolen : false
      }
      console.log(vehicle);
    });
    
    
  }
}
