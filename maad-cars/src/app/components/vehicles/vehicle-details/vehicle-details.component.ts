import { Component, OnInit, Input } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { VehicleService } from 'src/app/services/vehicle.service';
import { delay } from 'rxjs/operators';
import { SaleService } from 'src/app/services/sale.service';
import { BidService } from 'src/app/services/bid.service';
import { Sale } from '../../../models/sale';

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
    private saleService: SaleService,
    private bidService: BidService
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
    this.vehicle!._stolen = flag;
    console.log(this.vehicle?._stolen);
    console.log(this.vehicle);
    this.vehicleService.updateVehicle(this.vehicle!)
      .subscribe(vehicle => {
        console.log(vehicle);
        this.vehicle = vehicle;
      });
  }

  putOnSale() {
    const newSale = {
      sale_id: 0,
      vehicle: this.passedVehicle!,
      time_started: "00:00:00"
    }
    console.log(newSale);
    this.saleService.addSale(newSale)
      .subscribe(sale => this.router.navigateByUrl(`/my-sales/bids/${sale.sale_id}`));
  }

  async deleteVehicle() {
    var sale: Sale;
    var bidPromises: Promise<any>[] = [];
    var salePromise: Promise<any>;
    this.saleService.getSales()
      .subscribe(sales => {
        for (var s of sales) {
          if (s.vehicle.vehicle_id === this.vehicle?.vehicle_id) {
            sale = s;
            break;
          }
        }
        if (sale) {
          this.bidService.getBids()
            .subscribe(bids => {
              for (var b of bids) {
                if (b.sale.sale_id === sale.sale_id) {
                  bidPromises.push(
                    this.bidService.deleteBid(b.bid_id)
                      .toPromise()
                  );
                }
              }
              salePromise = this.finishDeleteSale(bidPromises, sale);
            });
            this.finishDeleteVehicle(salePromise, this.vehicle!);
        } else {
          this.callDeleteVehicle(this.vehicle!);
        }
      });
  }

  async finishDeleteSale(promises: Promise<any>[], sale: Sale) {
    await Promise.all(promises).then(any => {
      this.saleService.deleteSale(sale.sale_id)
        .subscribe();
    });
  }

  async finishDeleteVehicle(promise: Promise<any>, vehicle: Vehicle) {
    await promise.then(any => {
      this.callDeleteVehicle(vehicle);
    })
  }

  callDeleteVehicle(vehicle: Vehicle) {
    this.vehicleService.deleteVehicle(vehicle.vehicle_id)
        .subscribe(any => {this.router.navigateByUrl('/vehicles');
      });
  }

}
