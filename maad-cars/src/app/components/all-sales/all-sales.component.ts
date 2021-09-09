import { Component, OnInit } from '@angular/core';

import { Sale } from '../../models/sale';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.css']
})
export class AllSalesComponent implements OnInit {

  sales: Sale[] = [];

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(): void {
    this.saleService.getSales()
    .subscribe(sales => this.sales = sales);

  }
}
