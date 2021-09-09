import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Make } from '../models/make';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class MakeService {

  private makesUrl = 'http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com/makes';  // URL to backend

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET makes from the server */
  getMakes(): Observable<Make[]> {
    return this.http.get<Make[]>(this.makesUrl)
      .pipe(
        tap(_ => this.log('fetched makes')),
        catchError(this.handleError<Make[]>('getMakes', []))
      );
  }

  /** GET make by id. Return `undefined` when id not found */
  getMakeNo404<Data>(id: number): Observable<Make> {
    const url = `${this.makesUrl}/${id}`;
    return this.http.get<Make[]>(url)
      .pipe(
        map(makes => makes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} make id=${id}`);
        }),
        catchError(this.handleError<Make>(`getMake id=${id}`))
      );
  }

  /** GET make by id. Will 404 if id not found */
  getMake(id: number): Observable<Make> {
    const url = `${this.makesUrl}/${id}`;
    return this.http.get<Make>(url).pipe(
      tap(_ => this.log(`fetched make id=${id}`)),
      catchError(this.handleError<Make>(`getMake id=${id}`))
    );
  }

  /* GET makes whose name contains search term */
  searchMakes(term: string): Observable<Make[]> {
    if (!term.trim()) {
      // if not search term, return empty make array.
      return of([]);
    }
    return this.http.get<Make[]>(`${this.makesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found makes matching "${term}"`) :
         this.log(`no makes matching "${term}"`)),
      catchError(this.handleError<Make[]>('searchMakes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new make to the server */
  addMake(make: Make): Observable<Make> {
    return this.http.post<Make>(this.makesUrl, make, this.httpOptions).pipe(
      tap((newMake: Make) => this.log(`added make w/ id=${newMake.make_id}`)),
      catchError(this.handleError<Make>('addMake'))
    );
  }

  /** DELETE: delete the make from the server */
  deleteMake(id: number): Observable<Make> {
    const url = `${this.makesUrl}/${id}`;

    return this.http.delete<Make>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted make id=${id}`)),
      catchError(this.handleError<Make>('deleteMake'))
    );
  }

  /** PUT: update the make on the server */
  updateMake(make: Make): Observable<any> {
    return this.http.put(this.makesUrl, make, this.httpOptions).pipe(
      tap(_ => this.log(`updated make id=${make.make_id}`)),
      catchError(this.handleError<any>('updateMake'))
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

  /** Log a MakeService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MakeService: ${message}`);
  }
}