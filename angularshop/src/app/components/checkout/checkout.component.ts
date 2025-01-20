// src/app/components/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { PromotionalCodeService } from '../../services/promotional-code.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cart: any = { items: [] };
  totalPrice: number = 0;
  selectedPaymentMethod: string = 'creditCard';
  creditCardInfo: any = {};
  bankTransferInfo: any = {};
  contactInfo: any = { contactNumber: '', deliveryAddress: '' };
  promoCode = '';
  discount = 0;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router,
    private promotionalCodeService: PromotionalCodeService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const userId = this.authService.getUserId();
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

  confirmOrder(): void {
    const userId = this.authService.getUserId();
    const order = {
      user: { id: userId },
      items: this.cart.items.map((item: any) => ({
        product: { id: item.product.id },
        quantity: item.quantity,
        discountPercentage: item.discountPercentage,
        discountAmount: item.discountAmount,
      })),
      totalPrice: this.totalPrice,
      paymentMethod: this.selectedPaymentMethod,
      creditCardInfo:
        this.selectedPaymentMethod === 'creditCard'
          ? this.creditCardInfo
          : null,
      bankTransferInfo:
        this.selectedPaymentMethod === 'bankTransfer'
          ? this.bankTransferInfo
          : null,
      contactNumber: this.contactInfo.contactNumber,
      deliveryAddress: this.contactInfo.deliveryAddress,
      paymentStatus: 'paid',
    };

    this.orderService.createOrder(order).subscribe(
      (response) => {
        this.updateStock(order.items);
        this.snackBar.open(
          'Thank you for your order. You should get delivery soon.',
          'Close',
          {
            duration: 3000,
          }
        );
        this.clearCart();
        this.router.navigate(['/user-dashboard']);
      },
      (error) => {
        console.error('Failed to place order', error);
        this.snackBar.open('Failed to place order', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  updateStock(items: any[]): void {
    items.forEach((item) => {
      this.productService.updateStock(item.product.id, item.quantity).subscribe(
        () => {
          console.log('Stock updated successfully');
        },
        (error) => {
          console.error('Failed to update stock', error);
        }
      );
    });
  }

  clearCart(): void {
    const userId = this.authService.getUserId();
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

  // src/app/components/checkout/checkout.component.ts
  generatePrintContent(): string {
    const invoiceCard =
      document.querySelector('.checkout-card')?.innerHTML || '';
    const paymentCard =
      document.querySelector('.payment-card')?.innerHTML || '';
    const contactCard =
      document.querySelector('.contact-card')?.innerHTML || '';

    return `
    <div class="checkout-card">${invoiceCard}</div>
    <div class="payment-card">${paymentCard}</div>
    <div class="contact-card">${contactCard}</div>
  `;
  }

  printInvoice(): void {
    const printContents = this.generatePrintContent();
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  // src/app/components/checkout/checkout.component.ts

  applyPromoCode(): void {
    if (!this.promoCode) {
      return;
    }
    this.promotionalCodeService.validatePromoCode(this.promoCode).subscribe(
      (discountValue) => {
        // discountValue = 0.10 means 10% discount
        this.discount = discountValue;
        this.cart.items.forEach((item: any) => {
          // Base subtotal
          const baseSubtotal = item.product.price * item.quantity;
          // Set discount percentage and amount
          item.discountPercentage = this.discount;
          item.discountAmount = baseSubtotal * this.discount;
        });
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Failed to validate promo code', error);
      }
    );
  }

  calculateTotalPrice(): void {
    const baseTotal = this.cart.items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    );
    // Apply discount to the entire cart if desired
    this.totalPrice = baseTotal - baseTotal * this.discount;
  }
}
