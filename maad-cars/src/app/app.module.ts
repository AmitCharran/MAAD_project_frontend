import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { CreateVehicleComponent } from './components/create-vehicle/create-vehicle.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { MySalesComponent } from './components/my-sales/my-sales.component';
import { BidsOnCarComponent } from './components/bids-on-car/bids-on-car.component';
import { ListBidsOnCarsComponent } from './components/list-bids-on-cars/list-bids-on-cars.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    AllSalesComponent,
    MessagesComponent,
    SaleDetailComponent,
    VehicleListComponent,
    CreateVehicleComponent,
    MySalesComponent,
    BidsOnCarComponent,
    ListBidsOnCarsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
