// src/app/components/admin-product-dialog/admin-product-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-product-dialog',
  templateUrl: './admin-product-dialog.component.html',
  styleUrls: ['./admin-product-dialog.component.css'],
})
export class AdminProductDialogComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = []; // Assuming categories are fetched from the backend

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AdminProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      categoryId: [null, Validators.required],
    });

    if (data.isEdit) {
      this.productForm.patchValue(data.product);
    }
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Failed to load categories', error);
      }
    );
  }

  onSave(): void {
    if (this.productForm.valid) {
      if (this.data.isEdit) {
        const updatedProduct = {
          ...this.data.product,
          ...this.productForm.value,
        };
        this.productService
          .updateProduct(this.data.product.id, updatedProduct)
          .subscribe(
            () => this.dialogRef.close(true),
            (error) => console.error('Failed to update product', error)
          );
      } else {
        this.productService.createProduct(this.productForm.value).subscribe(
          () => this.dialogRef.close(true),
          (error) => console.error('Failed to create product', error)
        );
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
