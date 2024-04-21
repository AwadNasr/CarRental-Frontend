import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private  _HttpClient:HttpClient) { }
  addrental(data:any):Observable<any>{
    return this._HttpClient.post("https://localhost:7098/api/Rental",data)
  }
}
