// src/app/components/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service'; // Assuming you have an AuthService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any = { items: [] };
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.getCartByUserId(userId).subscribe(
      (cart) => {
        this.cart = cart;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Failed to load cart', error);
      }
    );
  }

  calculateTotalPrice(): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.getTotalPrice(userId).subscribe(
      (totalPrice) => {
        this.totalPrice = totalPrice;
      },
      (error) => {
        console.error('Failed to calculate total price', error);
      }
    );
  }

  updateQuantity(productId: number, quantity: number): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.updateItemQuantity(userId, productId, quantity).subscribe(
      (cart) => {
        this.cart = cart;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Failed to update quantity', error);
      }
    );
  }

  increaseQuantity(productId: number, quantity: number): void {
    this.updateQuantity(productId, quantity + 1);
  }

  decreaseQuantity(productId: number, quantity: number): void {
    if (quantity > 1) {
      this.updateQuantity(productId, quantity - 1);
    }
  }

  removeItem(productId: number): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cartService.removeItemFromCart(userId, productId).subscribe(
      (cart) => {
        this.cart = cart;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Failed to remove item', error);
      }
    );
  }

  clearCart(): void {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the logged-in user's ID
    this.cart.items.forEach((item: any) => {
      this.cartService.removeItemFromCart(userId, item.product.id).subscribe(
        () => {
          // Item removed
        },
        (error) => {
          console.error('Failed to remove item', error);
        }
      );
    });
    this.cart.items = [];
    this.totalPrice = 0;
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout-new']);
  }
}
