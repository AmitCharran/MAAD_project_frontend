import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehicleListComponent } from './components/vehicles/vehicle-list/vehicle-list.component';
import { CreateVehicleComponent } from './components/vehicles/create-vehicle/create-vehicle.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { VehicleDetailsComponent } from './components/vehicles/vehicle-details/vehicle-details.component';
import { UpdateVehicleComponent } from './components/vehicles/update-vehicle/update-vehicle.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { MySalesComponent } from './components/my-sales/my-sales.component';
import { ListBidsOnCarsComponent } from './components/list-bids-on-cars/list-bids-on-cars.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicles/add-vehicle', component: CreateVehicleComponent },
  { path: 'vehicles/detail/:id', component: VehicleDetailsComponent },
  { path: 'vehicles/detail/:id/edit', component: UpdateVehicleComponent },
  { path: 'all-sales/detail/:sale_id', component: SaleDetailComponent },
  { path: 'my-sales', component: MySalesComponent },
  { path: 'all-sales', component: AllSalesComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'my-sales/bids/:sale_id', component: ListBidsOnCarsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'create-account', component: CreateAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
