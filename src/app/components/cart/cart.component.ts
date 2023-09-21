import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/interfaces/product.model';
import { DataService } from '../../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  constructor(private dataService: DataService,
              private router: Router,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.addedProducts = this.dataService.getCartData();
  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeProduct(item.id);
      this.openSnackBar(item.name + ' was removed form cart!', 'Dismiss');
    }
  }

  removeProduct(productId: number) {
    this.addedProducts = this.addedProducts.filter(product => {
      return product.id !== productId;
    });
    this.dataService.removeProduct(productId);

  }

  increaseQuantity(item: any) {
    item.quantity++;
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

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'removed-to-cart-snackbar',
    });
  }

  productDetail(productId: number) {
    this.router.navigate([`detail/` + productId]).then();
  }

}
