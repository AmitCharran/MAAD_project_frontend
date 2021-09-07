import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { MessagesComponent } from './messages/messages.component';
import { SaleDetailComponent } from './sale-detail/sale-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AllSalesComponent,
    MessagesComponent,
    SaleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
