import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import * as global from '../global';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehiclesUrl = 'http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com/vehicles';
  //private vehiclesUrl = 'http://localhost:8080/vehicles';
  private vehicles: Vehicle[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'user_id': `${global.current_user_id}`
    })
  };
  constructor(
    private http: HttpClient) { }

  convertToDto(vehicle: Vehicle) {
    return {
      vehicle_id : vehicle.vehicle_id,
      user_id : vehicle.user.user_id,
      model_id : vehicle.model.model_id,
      vin : vehicle.vin,
      color : vehicle.color,
      _stolen : vehicle._stolen,
      description : vehicle.description
    }
  }

  /** Get all vehicles from the server
  GET /vehicles */
  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehiclesUrl)
            .pipe(
              tap(_ => this.log('fetched Vehicles.')),
              catchError(this.handleError<Vehicle[]>('getVehicles',[]))
            );
  }

  /** Get a vehicle by vehicle ID
  GET /vehicles/{vehicle_id} */
  findVehicleById(vehicle_id: number): Observable<Vehicle> {
    const url = `${this.vehiclesUrl}/${vehicle_id}`;
    return this.http.get<Vehicle>(url)
            .pipe(
              tap(_ => this.log(`fetched Vehicle with id=${vehicle_id}`)),
              catchError(this.handleError<Vehicle>(`findVehicleById id=${vehicle_id}`))
            );
  }

  /** Insert a vehicle for current user
  POST /vehicles */
  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    this.httpOptions.headers = this.httpOptions.headers.set('user_id',`${global.current_user_id}`);
    console.log(this.httpOptions.headers);
    return this.http.post<Vehicle>(this.vehiclesUrl, this.convertToDto(vehicle), this.httpOptions)
            .pipe(
              tap((newVehicle: Vehicle) => this.log(`inserted Vehicle with id=${newVehicle.vehicle_id}`)),
              catchError(this.handleError<Vehicle>('createVehicle'))
            );
  }

  /** Update a vehicle owned by current user
  PUT /vehicles */
  updateVehicle(vehicle: Vehicle): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('user_id',`${global.current_user_id}`);
    console.log(this.convertToDto(vehicle));
    return this.http.put<Vehicle>(this.vehiclesUrl, this.convertToDto(vehicle)._stolen=false, this.httpOptions)
            .pipe(
              tap(_ => this.log(`updated Vehicle with id=${vehicle.vehicle_id}`)),
              catchError(this.handleError<Vehicle>('updateVehicle'))
            );
  }

  /** Delete a vehicle owned by current user by vehicle ID
  DELETE /vehicles/{id} */
  deleteVehicle(vehicle_id: number): void {
    this.httpOptions.headers = this.httpOptions.headers.set('user_id',`${global.current_user_id}`);
    const url = `${this.vehiclesUrl}/${vehicle_id}`;
    this.http.delete<Vehicle>(url, this.httpOptions)
        .pipe(
          tap(_ => this.log(`deleted Vehicle with id=${vehicle_id}`)),
          catchError(this.handleError<Vehicle>('deleteVehicle'))
        );
  }

  /** Transfer a vehicle from current user to another user by ID
  PUT /vehicles/transfer/{vehicle_id}/to/{new_user_id} */
  transfer(vehicle: Vehicle, newUser: User): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set('user_id',`${global.current_user_id}`);
    const url = `${this.vehiclesUrl}/transfer/${vehicle.vehicle_id}/to/${newUser.user_id}`;
    return this.http.put<Vehicle>(url, this.httpOptions)
          .pipe(
            tap(_ => this.log(`transfered Vehicle with id=${vehicle.vehicle_id} from user id=${global.current_user_id} to user id=${newUser.user_id}`)),
            catchError(this.handleError<Vehicle>('transfer'))
          );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string) {
    console.log(`VehicleService: ${message}`);
  }
}
