import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId',
    'customerName',
    'status',
    'price',
    'contactNumber',
    'deliveryAddress',
    'trackingNumber',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Failed to load orders', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      () => {
        this.snackBar.open('Order status updated successfully', 'Close', {
          duration: 3000,
        });
        this.loadOrders();
      },
      (error) => {
        console.error('Failed to update order status', error);
        this.snackBar.open('Failed to update order status', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
