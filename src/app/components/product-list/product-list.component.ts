import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/interfaces/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private dataService: DataService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getData().subscribe((data: Product[]) => {
      this.products = data.map((product) => {
        return { ...product, quantity: 1 };
      });
    });
  }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/data.json');
  }

  productDetail(productId: number) {
    this.router.navigate([`details/` + productId]).then();
  }

  shareProduct(product: Product) {
    if (product) {
      this.dataService.setCartData(product);
      this.onAdded();
    }
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'added-to-cart-snackbar',
    });
  }

  onAdded() {
    this.openSnackBar('Item added to cart successfully!', 'Dismiss');
  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
    }
  }

  increaseQuantity(product: Product) {
    product.quantity += 1;
  }
}
