import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  apiUrl="http://localhost:3000/events"
  constructor(private http:HttpClient) { }


  getEventData():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)

    
  }
}
