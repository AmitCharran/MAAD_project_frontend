import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VehicleListComponent } from './components/vehicles/vehicle-list/vehicle-list.component';
import { CreateVehicleComponent } from './components/vehicles/create-vehicle/create-vehicle.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { MessagesComponent } from './messages/messages.component';
import { CreateVehicleInputMakeComponent } from './components/vehicles/create-vehicle-input-make/create-vehicle-input-make.component';
import { CreateVehicleInputModelComponent } from './components/vehicles/create-vehicle-input-model/create-vehicle-input-model.component';

@NgModule({
  declarations: [
    AppComponent,
    AllSalesComponent,
    MessagesComponent,
    VehicleListComponent,
    CreateVehicleComponent,
    CreateVehicleInputMakeComponent,
    CreateVehicleInputModelComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
