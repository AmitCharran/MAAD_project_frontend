import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Sale } from '../../models/sale';
import { SaleService } from '../../services/sale.service';
import { Bid } from '../bid';
import { BidService } from '../bid.service';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {

  sale: Sale | undefined;
  vehicle: Vehicle | undefined;
  bid: Bid | undefined;

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private bidService: BidService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getSale();
  }

  getSale(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('sale_id')!, 10);
    this.saleService.getSale(id)
      .subscribe(sale => this.sale = sale);
    this.vehicle = this.sale?.vehicle_id;
    this.bidService.getMaxBidBySale(this.sale?.sale_id)
      .subscribe(bid => this.bid = bid);
  }

  goBack(): void {
    this.location.back();
  }

  makeBid(): void {
    if (this.sale) {
      this.bidService.addBid(this.bid)
        .subscribe(() => this.goBack());
    }
  }

}
