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
  bid_accepted: boolean = false;
  bid_number_accepted: number | undefined;


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

  acceptBid(bid_id: number){
    this.bid_number_accepted = bid_id;
    this.bid_accepted = true;
  }

}
