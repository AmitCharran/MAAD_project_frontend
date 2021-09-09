import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Model } from '../models/model';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ModelService {

  private modelsUrl = 'http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com/models';  // URL to backend

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET models from the server */
  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.modelsUrl)
      .pipe(
        tap(_ => this.log('fetched models')),
        catchError(this.handleError<Model[]>('getModels', []))
      );
  }

  /** GET model by id. Return `undefined` when id not found */
  getModelNo404<Data>(id: number): Observable<Model> {
    const url = `${this.modelsUrl}/?id=${id}`;
    return this.http.get<Model[]>(url)
      .pipe(
        map(models => models[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} model id=${id}`);
        }),
        catchError(this.handleError<Model>(`getModel id=${id}`))
      );
  }

  /** GET model by id. Will 404 if id not found */
  getModel(id: number): Observable<Model> {
    const url = `${this.modelsUrl}/${id}`;
    return this.http.get<Model>(url).pipe(
      tap(_ => this.log(`fetched model id=${id}`)),
      catchError(this.handleError<Model>(`getModel id=${id}`))
    );
  }

  /* GET models whose name contains search term */
  searchModels(term: string): Observable<Model[]> {
    if (!term.trim()) {
      // if not search term, return empty model array.
      return of([]);
    }
    return this.http.get<Model[]>(`${this.modelsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found models matching "${term}"`) :
         this.log(`no models matching "${term}"`)),
      catchError(this.handleError<Model[]>('searchModels', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new model to the server */
  addModel(model: Model): Observable<Model> {
    return this.http.post<Model>(this.modelsUrl, model, this.httpOptions).pipe(
      tap((newModel: Model) => this.log(`added model w/ id=${newModel.id}`)),
      catchError(this.handleError<Model>('addModel'))
    );
  }

  /** DELETE: delete the model from the server */
  deleteModel(id: number): Observable<Model> {
    const url = `${this.modelsUrl}/${id}`;

    return this.http.delete<Model>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted model id=${id}`)),
      catchError(this.handleError<Model>('deleteModel'))
    );
  }

  /** PUT: update the model on the server */
  updateModel(model: Model): Observable<any> {
    return this.http.put(this.modelsUrl, model, this.httpOptions).pipe(
      tap(_ => this.log(`updated model id=${model.id}`)),
      catchError(this.handleError<any>('updateModel'))
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

  /** Log a ModelService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ModelService: ${message}`);
  }
}