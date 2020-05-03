import { Injectable } from '@angular/core';
import {  Items } from './mock_data'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService  {
  private apiUrl = 'http://localhost:8000/items';
  constructor(private http: HttpClient) { }

  getItems(): Observable<Items[]> {
    return this.http.get<Items[]>(this.apiUrl).pipe(
      tap(_ => console.log('fetched heroes')),
      //The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error.
      catchError(this.handleError<Items[]>('getItems', []))
    );
  }


/**
 * Handle Http operation that failed.
 * It replaces the error with an empty item.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
