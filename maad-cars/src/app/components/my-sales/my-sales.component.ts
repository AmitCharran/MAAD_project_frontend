import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/sale'
import { current_user_id } from 'src/app/global';
@Component({
  selector: 'app-my-sales',
  templateUrl: './my-sales.component.html',
  styleUrls: ['./my-sales.component.css']
})
export class MySalesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  sales: Sale[] = [];
  myVehiclesOnSale: Vehicle[] = [];
  constructor(
    private vehicleService: VehicleService,
    private saleService: SaleService) { }
  ngOnInit(): void {
    this.getVehicle()
    this.getSales()
  }
  getVehicle(){
    this.vehicleService.getAllVehicles()
    .subscribe((vehicles: Vehicle[]) => {
      this.vehicles = vehicles;
      
    });
    
  };
  getSales(){
    this.saleService.getSales()
    .subscribe((sales: Sale[]) => {
      this.sales = sales.filter(sale => sale.vehicle.user.user_id === current_user_id);
    });
  };

}