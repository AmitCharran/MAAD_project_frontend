import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { MySalesComponent } from './components/my-sales/my-sales.component';
import { ListBidsOnCarsComponent } from './components/list-bids-on-cars/list-bids-on-cars.component';
const routes: Routes = [
  { path: '', redirectTo: '/vehicles', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'all-sales/detail/:sale_id', component: SaleDetailComponent },
  { path: 'my-sales', component: MySalesComponent },
  { path: 'all-sales', component: AllSalesComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'my-sales/bids/:sale_id', component: ListBidsOnCarsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
