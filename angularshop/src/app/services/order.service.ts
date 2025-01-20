// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, null, {
      params: { status },
    });
  }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
