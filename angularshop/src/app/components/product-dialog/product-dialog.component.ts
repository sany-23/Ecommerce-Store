// src/app/components/product-dialog/product-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service'; // Assuming you have an AuthService
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css'],
})
export class ProductDialogComponent {
  inCart: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.checkIfInCart();
  }

  addToCart(product: any): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.addItemToCart(userId, product.id, 1).subscribe(
      () => {
        this.inCart = true;
      },
      (error) => {
        console.error('Failed to add product to cart', error);
      }
    );
  }

  checkIfInCart(): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.getCartByUserId(userId).subscribe(
      (cart) => {
        this.inCart = cart.items.some(
          (item: { product: { id: number } }) => item.product.id === this.data.id        );
      },
      (error) => {
        console.error('Failed to load cart', error);
      }
    );
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/images/${imagePath}`;
  }
}
