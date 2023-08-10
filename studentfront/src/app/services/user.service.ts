import { Injectable } from '@angular/core';
import baseUrl from './url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/admin/addUser`, user);
  }
}
