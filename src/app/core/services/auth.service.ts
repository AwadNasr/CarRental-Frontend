import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser =new BehaviorSubject(null)


  constructor(private _HttpClient:HttpClient,private _Router:Router) {
    if(localStorage.getItem('CurrentToken') !==null){
      this.decode()
    }
   }

  register(data:any):Observable<any>{
    return this._HttpClient.post("https://localhost:7098/api/Account/register", data);
  }
  login(data:any):Observable<any>{
    return this._HttpClient.post("https://localhost:7098/api/Account/login", data);
  }

  logout(){
    localStorage.removeItem('CurrentToken')
    localStorage.removeItem('UserName')
    localStorage.removeItem('UserId')
    this.currentUser.next(null)
    this._Router.navigate(['/login'])
  }

  decode(){
    let encode=JSON.stringify(localStorage.getItem('CurrentToken'))
    let decoded:any=jwtDecode(encode)
    this.currentUser.next(decoded)
  }

}
