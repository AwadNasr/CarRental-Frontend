import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _HttpClient:HttpClient) { }
  getAllReview(id:any):Observable<any>{
    return this._HttpClient.get(`https://localhost:7098/api/Review/${id}`);
  }
}
