import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Sale } from '../../models/sale';
import { SaleService } from '../../services/sale.service';
import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';
import { Vehicle } from '../../models/vehicle';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { current_user_id } from 'src/app/global';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  sale: Sale | undefined;
  vehicle: Vehicle | undefined;
  bids: Bid[] = [];
  maxBid: Bid | undefined;
  amount: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private bidService: BidService,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSale();
  }

  getSale(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('sale_id')!, 10);
    this.saleService.getSale(id)
      .subscribe(sale => this.sale = sale);
    this.vehicle = this.sale?.vehicle;
    this.bidService.getBids()
      .subscribe(bids => this.bids = bids);
    
  }

  goBack(): void {
    this.location.back();
  }

  makeBid(): void {
    //let userLogin: User;
    let bid: Bid;
    
      this.userService.getUserById(current_user_id)
      .subscribe(user => {
        let time = new Time();
        if(this.amount && this.sale) {
        bid = {
          bid_id: 0,
          bid_amount: this.amount,
          sale_id: this.sale,
          user_id: user,
          time_stamp: 
        }}
        this.bidService.addBid(bid)
          .subscribe(() => this.goBack());
      });
    }
    }
  }

}
