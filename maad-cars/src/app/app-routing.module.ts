import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
<<<<<<< HEAD
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { MySalesComponent } from './components/my-sales/my-sales.component';
import { ListBidsOnCarsComponent } from './components/list-bids-on-cars/list-bids-on-cars.component';
=======
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

>>>>>>> 2f9087acacc6f01ef529a1d009f7a8004ad1583e
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'all-sales/detail/:sale_id', component: SaleDetailComponent },
  { path: 'my-sales', component: MySalesComponent },
  { path: 'all-sales', component: AllSalesComponent },
  { path: 'user', component: UserDetailComponent },
<<<<<<< HEAD
  { path: 'my-sales/bids/:sale_id', component: ListBidsOnCarsComponent}
=======
  { path: 'login', component: LoginComponent},
  { path: 'create-account', component: CreateAccountComponent}
>>>>>>> 2f9087acacc6f01ef529a1d009f7a8004ad1583e
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
