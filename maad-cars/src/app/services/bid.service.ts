import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Bid } from '../models/bid';
import { current_user_id } from '../global';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private bidsUrl = 'http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com/bids';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'user_id': `${current_user_id}` })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /** GET bids from the server */
  getBids(): Observable<Bid[]> {
    return this.http.get<Bid[]>(this.bidsUrl)
      .pipe(
        tap(_ => this.log('fetched bid')),
        catchError(this.handleError<Bid[]>('getBids', []))
      );
  }

  /** Get bid by id. Return undefined when id not found*/
  getBidNo404<Data>(id:number): Observable<Bid>{
    const url = `${this.bidsUrl}/?id=${id}`;
    return this.http.get<Bid[]>(url)
    .pipe(
      map(bids => bids[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} bid id=${id}`);
      }),
      catchError(this.handleError<Bid>(`getBid id=${id}`))
    );
  }

  /** get bid by ID */
  getBid(id:number):Observable<Bid>{
    const url = `${this.bidsUrl}/${id}`;
    return this.http.get<Bid>(url).pipe(
      tap(_ => this.log(`fetched sale id=${id}`)),
      catchError(this.handleError<Bid>(`getSale id=${id}`))
    );
  }

  /* GET bids whose name contains search term */
  searchBids(term: string): Observable<Bid[]> {
      if (!term.trim()) {
        // if not search term, return empty bid array.
        return of([]);
      }
      return this.http.get<Bid[]>(`${this.bidsUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
           this.log(`found sales matching "${term}"`) :
           this.log(`no sales matching "${term}"`)),
        catchError(this.handleError<Bid[]>('searchBids', []))
      );
    }

  /** DELETE: delete the bid from the server */
  deleteBid(id: number): Observable<Bid> {
    const url = `${this.bidsUrl}/${id}`;

    return this.http.delete<Bid>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted bid id=${id}`)),
      catchError(this.handleError<Bid>('deleteBid'))
    );
  }
  //////// Save methods //////////
  /** POST: add a new bid to the server */
  addBid(bid: Bid): Observable<Bid> {
    var bidDTO = {
      bid_id: bid.bid_id,
      bid: bid.bid,
      sale_id: bid.sale.sale_id,
      user_id: bid.user.user_id
    }
      return this.http.post<Bid>(this.bidsUrl, bidDTO, this.httpOptions).pipe(
        tap((newBid: Bid) => this.log(`added bid w/ id=${newBid.bid_id}`)),
        catchError(this.handleError<Bid>('addBid'))
      );
    }

  /** PUT: update the bid on the server */
  updateBid(bid: Bid): Observable<any> {
    return this.http.put(this.bidsUrl, bid, this.httpOptions).pipe(
      tap(_ => this.log(`updated bid id=${bid.bid_id}`)),
      catchError(this.handleError<any>('updateBid'))
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
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log BidService message with MessageService */
  private log(message: string) {
    this.messageService.add(`SaleService: ${message}`);
  }
}
