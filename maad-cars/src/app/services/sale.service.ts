import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Sale } from '../models/sale';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class SaleService {

  //private salesUrl = 'http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com/sales';  // URL to backend
  private salesUrl = 'http://localhost:8080/sales';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  convertToDto(sale: Sale) {
    return {
      sale_id: sale.sale_id,
      vehicle_id: sale.vehicle.vehicle_id,
      time_started: sale.time_started
    }
  }
  

  /** GET sales from the server */
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.salesUrl)
      .pipe(
        tap(_ => this.log('fetched sales')),
        catchError(this.handleError<Sale[]>('getSales', []))
      );
  }

  /** GET sale by id. Return `undefined` when id not found */
  getSaleNo404<Data>(id: number): Observable<Sale> {
    const url = `${this.salesUrl}/?id=${id}`;
    return this.http.get<Sale[]>(url)
      .pipe(
        map(sales => sales[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} sale id=${id}`);
        }),
        catchError(this.handleError<Sale>(`getSale id=${id}`))
      );
  }

  /** GET sale by id. Will 404 if id not found */
  getSale(id: number): Observable<Sale> {
    const url = `${this.salesUrl}/${id}`;
    return this.http.get<Sale>(url).pipe(
      tap(_ => this.log(`fetched sale id=${id}`)),
      catchError(this.handleError<Sale>(`getSale id=${id}`))
    );
  }

  /* GET sales whose name contains search term */
  searchSales(term: string): Observable<Sale[]> {
    if (!term.trim()) {
      // if not search term, return empty sale array.
      return of([]);
    }
    return this.http.get<Sale[]>(`${this.salesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found sales matching "${term}"`) :
         this.log(`no sales matching "${term}"`)),
      catchError(this.handleError<Sale[]>('searchSales', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new sale to the server */
  addSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.salesUrl, this.convertToDto(sale), this.httpOptions).pipe(
      tap((newSale: Sale) => this.log(`added sale w/ id=${newSale.sale_id}`)),
      catchError(this.handleError<Sale>('addSale'))
    );
  }

  /** DELETE: delete the sale from the server */
  deleteSale(id: number): Observable<Sale> {
    const url = `${this.salesUrl}/${id}`;

    return this.http.delete<Sale>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted sale id=${id}`)),
      catchError(this.handleError<Sale>('deleteSale'))
    );
  }

  /** PUT: update the sale on the server */
  updateSale(sale: Sale): Observable<any> {
    return this.http.put(this.salesUrl, this.convertToDto(sale), this.httpOptions).pipe(
      tap(_ => this.log(`updated sale id=${sale.sale_id}`)),
      catchError(this.handleError<any>('updateSale'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a SaleService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SaleService: ${message}`);
  }
}