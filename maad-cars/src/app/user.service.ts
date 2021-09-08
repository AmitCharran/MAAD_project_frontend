import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersApiUrl = "http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com/users";

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersApiUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUserById(id : number) : Observable<User>{
    const url = `${this.usersApiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUserById id=${id}`))
    );
  }

  getUserByUsername(username : String) : Observable<User>{
    const url = `${this.usersApiUrl}/${username}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUserByUsername username=${username}`))
    );
  }

  createUser(user : User) : Observable<User>{
    return this.http.post<User>(this.usersApiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('createUser'))
    );
  }

  updateUser(user : User) : Observable<any>{
    return this.http.put(this.usersApiUrl, user).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id : number) : Observable<User>{
    const url = `${this.usersApiUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      catchError(this.handleError<User>('deleteHero'))
    );
  }

  loginUser(user : User) : Observable<User>{
    const url = this.usersApiUrl + "/login";
    return this.http.post<User>(url, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('loginUser'))
    )
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
     private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        //this.log(`${operation} failed: ${error.message}`);

        // TODO: make ErrorMessage component and have failed login display message
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
