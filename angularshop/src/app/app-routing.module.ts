import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CheckoutNewComponent } from './components/checkout-new/checkout-new.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'checkout-new',
    component: CheckoutNewComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-products',
    component: AdminProductsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-orders',
    component: AdminOrdersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin-users',
    component: AdminUsersComponent,
    canActivate: [AdminGuard],
  },

  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
