import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './url';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  
public currentUser() {
    console.log("current user");
    return this.http.get(`${baseUrl}/admin/`);
  }

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/admin/login`, loginData);
  }

  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == null || token == '') {
      return false;
    } else {
      return true;
    }
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("logout");
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }
  
  public getUserRole(){
    let user = this.getUser().authorities[0].authority;
    console.log("hi"+user.authorities[0].authority);
    return user;
  }


}

// {
//     "/api/*": {
//         "target": "http://localhost:8080",
//         "secure": false,
//         "logLevel": "debug",
//         "changeOrigin": true
//     }
//     }

// "architect": {
      //   "build": {
      //     "builder": "@angular-devkit/build-angular:browser",
      //     "options": {