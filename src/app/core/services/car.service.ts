import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private _HttpClient:HttpClient,private _AuthService:AuthService) {
    if(localStorage.getItem('CurrentToken') !==null){
      this._AuthService.decode()
    }
   }

  getAllCars():Observable<any>{
    return this._HttpClient.get("https://localhost:7098/api/Car")
  }
  getSpecificCar(id:any):Observable<any>{
    return this._HttpClient.get(`https://localhost:7098/api/Car/getallcars/${id}`)
  }
  getAllCarsToOwner(id:any):Observable<any>{
    return this._HttpClient.get(`https://localhost:7098/api/Car/${id}`)
  }
  deleteCar(id:number):Observable<any>{
    return this._HttpClient.delete(`https://localhost:7098/api/Car/${id}`)
  }
  uploadCar(data:any):Observable<any>
  {
    return this._HttpClient.post('https://localhost:7098/api/Car',data)
  }
  updateCar(data:any,id:number):Observable<any>
  {
    return this._HttpClient.put('https://localhost:7098/api/Car/${id}', data)
  }



}
