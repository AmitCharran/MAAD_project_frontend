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
  bids: Bid[] = [];
  maxBid: Bid | undefined;
  amount: string | undefined;

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
      .subscribe(sale => {
        this.sale = sale;
        this.bidService.getBids()
          .subscribe(bids => {
            this.bids = bids;
            for (let bid of bids){
              if(bid.sale.sale_id === this.sale?.sale_id){
                if(this.maxBid == undefined){
                  this.maxBid = bid;
                }
                if(bid.bid > this.maxBid.bid){
                  this.maxBid = bid;
                }
              }
            }
          }
        );
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  makeBid(): void {
    //let userLogin: User;
    let bid: Bid;
    console.log(`Started makeBid, user id: ${current_user_id}`);
    this.userService.getUserById(current_user_id)
      .subscribe(user => {
        if(this.amount && this.sale) {
          console.log("Making bid object");
          let bid_amount = parseInt(this.amount);
        bid = {
          bid_id: 0,
          bid: bid_amount,
          sale: this.sale,
          user: user,
          time: "current time"
        }}
        console.log(bid);
        this.bidService.addBid(bid)
          .subscribe(() => this.goBack());
      }
    );
    console.log("method complete");
  }
}
  


