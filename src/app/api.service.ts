import { Injectable } from '@angular/core';
import {MOCK_DATA , Items} from './mock_data'
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getItems(): Items[] {
    return MOCK_DATA;
  }
  
}
