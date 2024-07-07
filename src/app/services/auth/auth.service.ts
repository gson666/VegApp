import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import User from 'src/app/models/User';
import RegisterDTO from 'src/app/models/Register';
import LoginDTO from 'src/app/models/Login';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
private baseURL = "https://localhost:7050/api/Auth";

  constructor(private httpClient:HttpClient) { }

  login(LoginDTO:any): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/login`,LoginDTO)
    .pipe(tap((result:any)=>{
      if(result&&result.token&&result.user){
      localStorage.setItem('token',result.token);
      localStorage.setItem('username',result.user);
      }
    }));
  }

  signup(RegisterDTO:any): Observable<any>{
    return this.httpClient.post(`${this.baseURL}/register`,RegisterDTO)
    .pipe(tap((result:any)=>{
      if(result&&result.token&&result.user){
      localStorage.setItem('token',result.token);
      localStorage.setItem('username', result.user);
      }
    }));
  }
  getUserProfile(username:string):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/profile/${username}`);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  isLoggedin(){
    return localStorage.getItem('token')!== null;
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getCurrentUser():string {
    return localStorage.getItem('username') || 'Guest';
  }
  
}
