import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Make } from '../models/make';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  private url3 = "https://vpic.nhtsa.dot.gov/api";
  private url = 'http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com';

  makes: Make[] =[];
  models: Model[] =[];

  constructor(
    private http: HttpClient
  ) { }

  cacheMakesModels() : void {
  //   let makes3;
  //   this.http.get<any>(this.url3+"/vehicles/GetAllMakes?format=json")
  //   .subscribe(results => {
  //     makes3 = results.Results;
  //     for( let make of makes3){
  //       let m: Make = {
  //         make_id: make.Make_ID,
  //         name: make.Make_Name
  //       }
  //       this.makes.push(m);
  //       let models3;
  //       this.http.get<any>(this.url3+`/vehicles/GetModelsForMakeId/${m.make_id}?format=json`)
  //       .subscribe(results => {
  //         models3 = results.Results;
  //         for( let model of models3){
  //           let mod: Model = {
  //             model_id: model.Model_ID,
  //             make: m,
  //             name: model.Model_Name
  //           }
  //           console.log(mod);
  //           this.models.push(mod);
  //         }
  //       });
  //     }

  //   });
  }
}
