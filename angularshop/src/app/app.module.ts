// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatPaginator} from "@angular/material/paginator";
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDivider} from "@angular/material/divider";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSort} from "@angular/material/sort";
import { AdminProductDialogComponent } from './components/admin-product-dialog/admin-product-dialog.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { CheckoutNewComponent } from './components/checkout-new/checkout-new.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    UserDashboardComponent,
    UserNavbarComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    ProductDialogComponent,
    AdminProductDialogComponent,
    UserDialogComponent,
    CheckoutNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectionList,
    MatListOption,
    MatPaginator,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatSelect,
    MatOption,
    MatDivider,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatRadioGroup,
    MatRadioButton,
    MatSort
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
