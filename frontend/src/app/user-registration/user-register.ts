import { Injectable } from '@angular/core';
import { environment } from '../environment';  
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRegister {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
}
