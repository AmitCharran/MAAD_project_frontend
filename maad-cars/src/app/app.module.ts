import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { MessagesComponent } from './components/messages/messages.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { MySalesComponent } from './components/my-sales/my-sales.component';
import { BidsOnCarComponent } from './components/bids-on-car/bids-on-car.component';
import { VehicleListComponent } from './components/vehicles/vehicle-list/vehicle-list.component';
import { CreateVehicleComponent } from './components/vehicles/create-vehicle/create-vehicle.component';
import { CreateVehicleInputMakeComponent } from './components/vehicles/create-vehicle-input-make/create-vehicle-input-make.component';
import { CreateVehicleInputModelComponent } from './components/vehicles/create-vehicle-input-model/create-vehicle-input-model.component';
import { CreateVehicleFormComponent } from './components/vehicles/create-vehicle-form/create-vehicle-form.component';
import { VehicleDetailsComponent } from './components/vehicles/vehicle-details/vehicle-details.component';
import { ListBidsOnCarsComponent } from './components/list-bids-on-cars/list-bids-on-cars.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DisplayAcceptedBidComponent } from './components/display-accepted-bid/display-accepted-bid.component';
import { UpdateVehicleComponent } from './components/vehicles/update-vehicle/update-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    AllSalesComponent,
    MessagesComponent,
    SaleDetailComponent,
    VehicleListComponent,
    CreateVehicleComponent,
    CreateVehicleInputMakeComponent,
    CreateVehicleInputModelComponent,
    CreateVehicleFormComponent,
    MySalesComponent,
    BidsOnCarComponent,
    VehicleDetailsComponent,
    ListBidsOnCarsComponent,
    LoginComponent,
    CreateAccountComponent,
    NavbarComponent,
    DisplayAcceptedBidComponent,
    UpdateVehicleComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
