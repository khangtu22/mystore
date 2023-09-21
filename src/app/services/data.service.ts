import { Product } from '../models/interfaces/product.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cartData: Product[] = [];

  getCartData() {
    return this.cartData;
  }

  setCartData(product: Product) {
    if (product){
      this.cartData.push(product);
    }
  }

  removeProduct(productId: number) {
    const index = this.cartData.findIndex(item => item.id === productId);

    if (index !== -1) {
      this.cartData.splice(index, 1);
    }
  }
}
