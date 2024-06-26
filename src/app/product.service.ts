import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  addProduct(product: Product): void {
    product.id = this.generateProductId();
    this.products.push(product);
    this.productsSubject.next(this.products);
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
      this.productsSubject.next(this.products);
    }
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter((p) => p.id !== productId);
    this.productsSubject.next(this.products);
  }

  private generateProductId(): number {
    return this.products.length > 0
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
  }
}
