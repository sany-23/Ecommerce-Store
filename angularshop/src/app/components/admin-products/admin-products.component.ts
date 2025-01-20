// src/app/components/admin-products/admin-products.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from '../../services/product.service';
import { AdminProductDialogComponent } from '../admin-product-dialog/admin-product-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.dataSource.data = products;
      },
      (error) => {
        console.error('Failed to load products', error);
      }
    );
  }

  addProduct(): void {
    const dialogRef = this.dialog.open(AdminProductDialogComponent, {
      width: '400px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
        this.snackBar.open('Product added successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  editProduct(product: any): void {
    const dialogRef = this.dialog.open(AdminProductDialogComponent, {
      width: '400px',
      data: { isEdit: true, product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.loadProducts();
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Failed to delete product', error);
        this.snackBar.open('Failed to delete product', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
