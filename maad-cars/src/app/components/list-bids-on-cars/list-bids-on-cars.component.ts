import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Bid } from '../../models/bid';
import { BidService } from '../../services/bid.service';
import { current_user_id } from 'src/app/global';
import { Sale } from '../../models/sale';
import { SaleService } from '../../services/sale.service';


@Component({
  selector: 'app-list-bids-on-cars',
  templateUrl: './list-bids-on-cars.component.html',
  styleUrls: ['./list-bids-on-cars.component.css']
})
export class ListBidsOnCarsComponent implements OnInit {
  bids: Bid[] =[];

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private bidService: BidService,
    private location: Location
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

}
