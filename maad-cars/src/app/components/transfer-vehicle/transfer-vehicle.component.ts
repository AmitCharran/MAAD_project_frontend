import { Component, OnInit, Input } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transfer-vehicle',
  templateUrl: './transfer-vehicle.component.html',
  styleUrls: ['./transfer-vehicle.component.css']
})
export class TransferVehicleComponent implements OnInit {

  vehicle?: Vehicle;

  recipientUsername : string | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private vehicleService: VehicleService,
              private userService: UserService) { }

  ngOnInit() : void{
    this.getVehicle();
  }

  getVehicle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.findVehicleById(id)
      .subscribe(vehicle => this.vehicle = vehicle);
  }

  transferVehicle() : void {
    this.userService.getUserByUsername(this.recipientUsername!)
      .subscribe(user => {
        console.log("Receiving User: " + user.user_id);
        if(this.vehicle){
          this.vehicleService.transfer(this.vehicle, user.user_id)
          .subscribe(response => this.router.navigateByUrl("/vehicles"));
      }});
    
    
  }
}
