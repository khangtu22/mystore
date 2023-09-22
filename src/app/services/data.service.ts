import { Product } from '../models/interfaces/product.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cartData: Product[] = [];

  getCartData(): Product[] {
    return this.cartData;
  }

  getCartDataLength(): number {
    return this.cartData.length;
  }

  setCartData(product: Product) {
    const foundProduct = this.cartData.find(item => item.id === product.id);

    if (foundProduct){
      foundProduct.quantity += 1;
    } else {
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
