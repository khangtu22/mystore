import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/interfaces/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductSharingService } from '../../services/product-sharing.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  addedProducts: Product[] = [];

  fullName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  address = new FormControl('', [Validators.required, Validators.minLength(6)]);
  creditCardNumber = new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]);

  checkoutForm = new FormGroup({
    fullName: this.fullName,
    address: this.address,
    creditCardNumber: this.creditCardNumber,
  });

  constructor(private productSharingService: ProductSharingService,
              private router: Router,
              private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.addedProducts = this.productSharingService.getCartData();
  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeProduct(item.id);
    }
  }

  removeProduct(productId: number) {
    this.addedProducts = this.addedProducts.filter(product => {
      return product.id !== productId;
    });
    this.productSharingService.removeProduct(productId);
    this.showToast();
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  onRemoveItemFromCart(product: Product){
    if (product){
      this.removeProduct(product.id);
    }
  }

  getTotalPrice(products: Product[]): number {
    return products.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTotalPriceOfOneItem(product: Product): number {
    return product.price * product.quantity;
  }

  submitForm() {
    this.router.navigate(['/checkout/success']).then();
  }

  showToast() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Success',
      detail: 'Item was removed from cart successfully!',
    });
  }

  productDetail(productId: number) {
    this.router.navigate([`detail/` + productId]).then();
  }

}
