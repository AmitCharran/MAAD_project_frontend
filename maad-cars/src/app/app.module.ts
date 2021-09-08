import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { CreateVehicleComponent } from './components/create-vehicle/create-vehicle.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AllSalesComponent,
    MessagesComponent,
    SaleDetailComponent,
    VehicleListComponent,
    CreateVehicleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
