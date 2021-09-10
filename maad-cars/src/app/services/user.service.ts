import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as global from '../global';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }


  //private usersApiUrl = "http://maad4-env.eba-g6ebnqmt.us-east-1.elasticbeanstalk.com/users";
  private usersApiUrl = `${global.backendUrl}/users`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Gets all the available users.
   * @returns an Observable of an array of all the current users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersApiUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  /**
   * Gets a single User by their user_id.
   * @param id the id of the User to be retrieved
   * @returns an Observable of the User
   */
  getUserById(id : number) : Observable<User>{
    const url = `${this.usersApiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUserById id=${id}`))
    );
  }

  /**
   * Gets a single User by their username.
   * @param username the username of the User to be retrieved
   * @returns an Observable of the User
   */
  getUserByUsername(username : String) : Observable<User>{
    const url = `${this.usersApiUrl}/${username}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUserByUsername username=${username}`))
    );
  }

  /**
   * Creates a new User.
   * @param user new User to be persisted to the database
   * @returns an Observable of the newly created user
   */
  createUser(user : User) : Observable<User>{
    return this.http.post<User>(this.usersApiUrl, user, this.httpOptions).pipe(
      catchError(this.handleError<User>('createUser'))
    );
  }

  /**
   * Updates a user with new information.
   * @param user User object with new values
   * @returns an Observable of the User with the new values
   */
  updateUser(user : User) : Observable<any>{
    return this.http.put(this.usersApiUrl, user).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Delete a current user from the database.
   * @param id id of the User to be deleted
   * @returns an Observable of type User that is not used
   */
  deleteUser(id : number) : Observable<User>{
    const url = `${this.usersApiUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      catchError(this.handleError<User>('deleteHero'))
    );
  }

  /**
   * Method to login a user.
   * @param user the user that is logging in
   * @returns an Observable with the logged in user's ID
   */
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
