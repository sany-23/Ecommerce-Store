// src/app/components/orders/orders.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {} // Inject AuthService

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = this.authService.getUserId(); // Fetch current user ID dynamically
    console.log('Fetching orders for user ID:', userId);
    this.orderService.getOrdersByUserId(userId).subscribe(
      (data) => {
        console.log('Orders fetched successfully:', data);
        this.orders = data;
      },
      (error) => {
        console.error('Failed to load orders', error);
      }
    );
  }
}
