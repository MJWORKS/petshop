import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<any[]>(`${this.url}products`);
  }
}
