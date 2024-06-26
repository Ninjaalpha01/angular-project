import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent {
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, // Injete os dados do produto para edição
    private productService: ProductService
  ) {
    this.productForm = this.formBuilder.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = {
        ...this.data,
        name: this.productForm.value.name,
        price: this.productForm.value.price
      };
      this.productService.updateProduct(updatedProduct);
      this.dialogRef.close();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
