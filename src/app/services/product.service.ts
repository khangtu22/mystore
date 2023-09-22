import { Product } from '../models/interfaces/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getTotalPrice(products: Product[]): number {
    return products.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/data.json');
  }
}
