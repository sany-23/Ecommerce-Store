// src/app/components/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { AuthService } from '../../services/auth.service'; // Assuming you have an AuthService
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: any[] = [];
  selectedCategory: number | null = null;
  totalProducts: number = 0;
  pageSize: number = 12;
  cart: { [productId: number]: boolean } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadCart();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.loadProducts(); // Load products after categories are loaded
      },
      (error) => {
        console.error('Failed to load categories', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products.slice(0, this.pageSize);
        this.totalProducts = products.length;
      },
      (error) => {
        console.error('Failed to load products', error);
      }
    );
  }

  loadCart(): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.getCartByUserId(userId).subscribe(
      (cart) => {
        cart.items.forEach((item: { product: { id: number } }) => {
          this.cart[item.product.id] = true;
        });
      },
      (error) => {
        console.error('Failed to load cart', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredProducts = this.products
      .filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      .slice(0, this.pageSize);
    this.totalProducts = this.filteredProducts.length;
  }

  applyCategoryFilter(): void {
    if (this.selectedCategory === null) {
      this.filteredProducts = this.products.slice(0, this.pageSize);
    } else {
      this.filteredProducts = this.products
        .filter((product) => product.category.id === this.selectedCategory)
        .slice(0, this.pageSize);
    }
    this.totalProducts = this.filteredProducts.length;
  }

  resetFilter(): void {
    this.selectedCategory = null;
    this.filteredProducts = this.products.slice(0, this.pageSize);
    this.totalProducts = this.products.length;
  }

  changePage(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.filteredProducts = this.products.slice(startIndex, endIndex);
  }

  addToCart(product: any): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.addItemToCart(userId, product.id, 1).subscribe(
      () => {
        this.cart[product.id] = true;
      },
      (error) => {
        console.error('Failed to add product to cart', error);
      }
    );
  }

  viewProduct(product: any): void {
    this.dialog.open(ProductDialogComponent, {
      data: product,
    });
  }

  getCategoryName(category: any): string {
    return category ? category.name : 'Unknown';
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/images/${imagePath}`;
  }
}
