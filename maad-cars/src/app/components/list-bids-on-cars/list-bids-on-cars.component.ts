import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';
import { current_user_id } from 'src/app/global';
import { Vehicle } from 'src/app/models/vehicle';
import { User } from 'src/app/models/user';
import { VehicleService } from 'src/app/services/vehicle.service';
import { SaleService } from '../../services/sale.service';
import { Sale } from 'src/app/models/sale';


@Component({
  selector: 'app-list-bids-on-cars',
  templateUrl: './list-bids-on-cars.component.html',
  styleUrls: ['./list-bids-on-cars.component.css']
})
export class ListBidsOnCarsComponent implements OnInit {
  bids: Bid[] =[];
  bid: Bid | undefined;
  vehicle: Vehicle | undefined;
  sale: Sale | undefined;
  current_user: User | undefined;
  buyer: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private bidService: BidService,
    private location: Location,
    private vehicleService: VehicleService
    ) { }

  ngOnInit(): void {
    this.getAllBidsOnCar();
  }

  getAllBidsOnCar(){
    const sale_id = parseInt(this.route.snapshot.paramMap.get('sale_id')!, 10);
    this.bidService.getBids()
    .subscribe((bids: Bid[]) => {
      this.bids = bids.filter(bid => bid.sale.sale_id === sale_id);
    });
  }

  goBack(): void {
    this.location.back();
  }

  finalizeBid(bid_id: number){
    this.bidService.getBid(bid_id)
    .subscribe((bid:Bid)=>{
        this.bid = bid;
        console.log(bid);
        this.sale = bid.sale;
        this.vehicle = bid.sale.vehicle;
        this.buyer = bid.user;
        this.current_user = bid.sale.vehicle.user;

        // update vehicle class
        this.vehicle.user = this.buyer;
        
        this.vehicleService.updateVehicle(this.vehicle).subscribe();
        // delete sale

    });
    //update user 
    // delete sale 
  }

}
