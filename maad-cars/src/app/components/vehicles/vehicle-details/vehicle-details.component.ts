import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VehicleService } from 'src/app/services/vehicle.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  @Input() passedVehicle?: Vehicle;
  vehicle?: Vehicle;
  isOnDetailRoute: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private vehicleService: VehicleService
  ) { }

  async ngOnInit() {
    await delay(200);
    if (this.passedVehicle) {
      this.vehicle = this.passedVehicle;
      this.isOnDetailRoute = false;
    } else {
      this.getVehicle();
    }
  }

  getVehicle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vehicleService.findVehicleById(id)
      .subscribe(vehicle => {
        if (this.passedVehicle) {
          this.vehicle = this.passedVehicle;
        } else {
          this.vehicle = vehicle;
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

  backToMyVehicles(): void {
    this.router.navigateByUrl("/vehicles");
  }
}
