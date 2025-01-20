// src/app/components/checkout-new/checkout-new.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PromotionalCodeService } from '../../services/promotional-code.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout-new.component.html',
  styleUrls: ['./checkout-new.component.css'],
})
export class CheckoutNewComponent implements OnInit {
  cartItems: any[] = [];
  displayedColumns: string[] = [
    'product',
    'price',
    'quantity',
    'totalAmount',
    'actions',
  ];
  couponCode = '';
  subTotal = 0;
  discount = 0;
  shippingCharge = 50;
  estimatedTax = 0;
  total = 0;
  contactInfo: any = {
    contactNumber: '',
    deliveryAddress: '',
  };

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private promotionalCodeService: PromotionalCodeService,
    private orderService: OrderService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = this.authService.getUserId();
    this.cartService.getCartByUserId(userId).subscribe(
      (cart) => {
        this.cartItems = cart.items.map((item: any) => ({
          ...item,
          totalAmount: item.product.price * item.quantity,
        }));
        this.calculateTotals();
      },
      (error) => {
        console.error('Failed to load cart', error);
      }
    );
  }

  removeItem(item: any) {
    const userId = this.authService.getUserId();
    this.cartService.removeItemFromCart(userId, item.product.id).subscribe(
      () => {
        this.cartItems = this.cartItems.filter((ci) => ci !== item);
        this.calculateTotals();
      },
      (error) => {
        console.error('Failed to remove item', error);
      }
    );
  }

  applyCoupon() {
    if (!this.couponCode) return;
    this.promotionalCodeService.validatePromoCode(this.couponCode).subscribe(
      (discountValue) => {
        // discountValue = 0.10 for 10% discount
        this.discount = this.subTotal * discountValue;
        this.calculateTotals();
      },
      (error) => {
        console.error('Failed to validate promo code', error);
      }
    );
  }

  calculateTotals() {
    this.subTotal = this.cartItems.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );
    this.total =
      this.subTotal - this.discount + this.shippingCharge + this.estimatedTax;
  }

  confirmOrder(): void {
    const userId = this.authService.getUserId();
    const order = {
      user: { id: userId },
      items: this.cartItems.map((item: any) => ({
        product: { id: item.product.id },
        quantity: item.quantity,
      })),
      totalPrice: this.total,
      contactNumber: this.contactInfo.contactNumber,
      deliveryAddress: this.contactInfo.deliveryAddress,
      paymentStatus: 'paid',
    };

    this.orderService.createOrder(order).subscribe(
      (response) => {
        // Update stock
        order.items.forEach((item) => {
          this.productService
            .updateStock(item.product.id, item.quantity)
            .subscribe(
              () => console.log('Stock updated successfully'),
              (error) => console.error('Failed to update stock', error)
            );
        });

        // Clear cart
        const userId = this.authService.getUserId();
        this.cartItems.forEach((item) => {
          this.cartService
            .removeItemFromCart(userId, item.product.id)
            .subscribe();
        });

        this.snackBar.open('Thank you for your order!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/user-dashboard']);
      },
      (error) => {
        console.error('Failed to confirm order', error);
        this.snackBar.open('Failed to place order', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/images/${imagePath}`;
  }
}
