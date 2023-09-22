import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/interfaces/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductSharingService } from '../../services/product-sharing.service';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.css'],
})
export class PaySuccessComponent implements OnInit {
  addedProducts: Product[] = [];

  constructor(
    private productSharingService: ProductSharingService,
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.addedProducts = this.productSharingService.getCartData();
  }

  getTotalPrice() {
    return this.productService.getTotalPrice(this.addedProducts);
  }

  navigateToHome() {
    this.router.navigate(['/']).then();
  }

}
