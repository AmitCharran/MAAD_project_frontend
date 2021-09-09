import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VehicleService } from 'src/app/services/vehicle.service';
import { delay } from 'rxjs/operators';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  @Input() passedVehicle?: Vehicle;
  vehicle?: Vehicle;
  isOnDetailRoute: boolean = true;
  id?: number;
  isOnSale?: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private vehicleService: VehicleService,
    private saleService: SaleService
  ) { }

  async ngOnInit() {
    await delay(200);
    if (this.passedVehicle) {
      this.vehicle = this.passedVehicle;
      this.isOnDetailRoute = false;
    } else {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.getVehicle();
      this.checkIfOnSale();
    }
  }

  getVehicle(): void {
    this.vehicleService.findVehicleById(this.id!)
      .subscribe(vehicle => {
        if (this.passedVehicle) {
          this.vehicle = this.passedVehicle;
        } else {
          this.vehicle = vehicle;
        }
      });
  }

  checkIfOnSale() {
    if (this.vehicle) {
      this.isOnSale = false;
      this.saleService.getSales()
        .subscribe(sales => {
          for (var sale of sales) {
            if (sale.vehicle.vehicle_id === this.vehicle?.vehicle_id) {
              this.isOnSale = true;
            }
          }
        })
    }
  }

  goBack(): void {
    this.location.back();
  }

  backToMyVehicles(): void {
    this.router.navigateByUrl("/vehicles");
  }

  setStolen(flag: boolean) {
    this.vehicle!.is_stolen = flag;
    this.vehicleService.updateVehicle(this.vehicle!)
      .subscribe(vehicle => this.vehicle = vehicle);
  }

  putOnSale() {
    const newSale = {
      sale_id: 0,
      vehicle: this.vehicle!,
      time_started: ""
    }
    this.saleService.addSale(newSale)
      .subscribe(sale => this.router.navigateByUrl(`/my-sales/bids/${sale.sale_id}`));
  }
}
