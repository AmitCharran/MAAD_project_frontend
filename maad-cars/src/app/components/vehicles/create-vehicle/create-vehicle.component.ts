import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/models/model';
import { Make } from '../../../models/make';
import { MakeService } from '../../../services/make.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {
  make?: Make;
  model?: Model;
  vin?: string;
  color?: string;
  description?: string;

  constructor(
    private makeService: MakeService
  ) { }

  ngOnInit(): void {
  }

  unpackForm(form: any) {
    this.vin = form?.vin;
    this.color = form?.color;
    this.description = form?.description;
  }

}
