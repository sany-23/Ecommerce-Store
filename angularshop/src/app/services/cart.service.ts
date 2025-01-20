// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/carts`;

  constructor(private http: HttpClient) {}

  getCartByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  addItemToCart(
    userId: number,
    productId: number,
    quantity: number
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/${userId}/items`, {
      productId,
      quantity,
    });
  }

  updateItemQuantity(
    userId: number,
    productId: number,
    quantity: number
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/${userId}/items`, {
      productId,
      quantity,
    });
  }

  removeItemFromCart(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${userId}/items/${productId}`);
  }

  getTotalPrice(userId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/user/${userId}/total-price`);
  }
}
