import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  convertToMake(dto: any): Make {
    var make: Make = {
      make_id : dto.Make_ID,
      name : dto.Make_Name
    }
    return make;
  }

  convertToModel(dto: any, make: Make): Model {
    var model: Model = {
      model_id: dto.Model_ID,
      make: make,
      name: dto.Model_Name
    }
    return model;
  }

  async getApiAllMakes(): Promise<Make[]> {
    let makes: Make[] = [];
    return await this.http.get<any>(this.url3+"/vehicles/GetAllMakes?format=json")
    .toPromise().then(results => {
      var dtos = results.Results;
      for(let m of dtos){
        makes.push(this.convertToMake(m));
      }
      return makes;
    });
  }

  async getApiAllModelsByMake(make_id: number, make: Make): Promise<Model[]> {
    let models: Model[] = [];
    return await this.http.get<any>(this.url3+`/vehicles/getmodelsformakeid/${make_id}?format=json`)
    .toPromise().then(results => {
      var dtos = results.Results;
      for(let m of dtos){
        models.push(this.convertToModel(m, make));
      }
      return models;
    });

  }
}
