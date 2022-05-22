import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'http://localhost:3000/v1';

  constructor(private http: HttpClient) {}

  public composeHeaders(): HttpHeaders {
    const token = localStorage.getItem('petshop.token');
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    return headers;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  authenticate(datas: any): Observable<any> {
    return this.http.post(`${this.url}/accounts/authenticate`, datas);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${this.url}/accounts/refresh-token`, null, {
      headers: this.composeHeaders(),
    });
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.url}/accounts`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.url}/accounts/reset-password`, data);
  }
}
