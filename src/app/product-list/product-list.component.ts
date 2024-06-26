// product-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProductService, Product } from '../product.service';
import { ProductAddModalComponent } from '../product-add-modal/product-add-modal.component';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  private productsSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productsSubscription = this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId);
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(ProductAddModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditModal(product: Product): void {
    const dialogRef = this.dialog.open(ProductEditModalComponent, {
      width: '400px',
      data: { ...product } // Passe os dados do produto para o modal de edição
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
