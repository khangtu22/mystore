import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/interfaces/product.model';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-success',
  templateUrl: './pay-success.component.html',
  styleUrls: ['./pay-success.component.css'],
})
export class PaySuccessComponent implements OnInit {
  addedProducts: Product[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.addedProducts = this.dataService.getCartData();
  }

  getTotalPrice() {
    return this.productService.getTotalPrice(this.addedProducts);
  }

  navigateToHome() {
    this.router.navigate(['/']).then();
  }

}
