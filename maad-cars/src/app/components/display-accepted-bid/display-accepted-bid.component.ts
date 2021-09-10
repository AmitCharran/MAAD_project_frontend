import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { current_user_id } from 'src/app/global';
import { UserService } from 'src/app/services/user.service';
import { Vehicle } from 'src/app/models/vehicle';
import { User } from 'src/app/models/user';
import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';

@Component({
  selector: 'app-display-accepted-bid',
  templateUrl: './display-accepted-bid.component.html',
  styleUrls: ['./display-accepted-bid.component.css']
})
export class DisplayAcceptedBidComponent implements OnInit {
  current_user: User | undefined;
  user_buying_car: User | undefined;
  bid: Bid | undefined;
  vehicle: Vehicle | undefined;


  constructor(
    private bidService:BidService,
    private route: ActivatedRoute,
    private location:Location,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.generateInfoBidVehicleUserBuyingCar();
    this.geneateUser();
  }

  generateInfoBidVehicleUserBuyingCar(){
    const bid_id = parseInt(this.route.snapshot.paramMap.get('bid_id')!, 10);
    this.bidService.getBid(bid_id)
    .subscribe((bid:Bid) => {
        this.bid = bid;
        this.user_buying_car = bid.user;
        this.vehicle = bid.sale.vehicle;
    });
  }

  geneateUser(){
    this.userService.getUserById(current_user_id)
    .subscribe((user:User) => {
      this.current_user = user;
    });
  }


}
