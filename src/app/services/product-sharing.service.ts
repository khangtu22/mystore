import { Injectable } from '@angular/core';
import { Product } from '../models/interfaces/product.model';


@Injectable({
  providedIn: 'root',
})
export class ProductSharingService {
  private _cartData: Product[] = [];

  constructor() {
  }

  setCartData(data: Product[]) {
    this._cartData = [...data];
  }

  getCartData() {
    if (this._cartData) {
      return this._cartData;
    } else {
      return [];
    }
  }

  addProduct(product: Product) {
    this._addToCart(product);
  }

  removeProduct(productId: number) {
    this._removeFromCart(productId);
  }


  private _addToCart(product: Product) {

    // Check if product already exists
    const existingProduct = this._cartData.find(item => item.id === product.id);

    if (existingProduct) {
      // Increment quantity
      existingProduct.quantity += product.quantity;
    } else {
      // Add new product
      this._cartData.push({ ...product });
    }

  }

  private _removeFromCart(productId: number) {

    // Find index of product to remove
    const productIndex = this._cartData.findIndex(product => {
      return product.id === productId;
    });

    if (productIndex !== -1) {
      // Remove product
      this._cartData.splice(productIndex, 1);
    }

  }

}
