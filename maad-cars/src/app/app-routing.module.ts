import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicles/vehicle-list/vehicle-list.component';
import { CreateVehicleComponent } from './components/vehicles/create-vehicle/create-vehicle.component';

const routes: Routes = [
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicles/add-vehicle', component: CreateVehicleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
