import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './url';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http:HttpClient,
  ) { }

  public userData(){
    return this.http.get(`${baseUrl}/admin/getAll`);
  }
}
