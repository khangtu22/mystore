import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/interfaces/product.model';
import { Router } from '@angular/router';
import { ProductSharingService } from '../../../services/product-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input()
  appName: string = "MyStore";
  addedProducts: Product[] = [];

  constructor(
    private router: Router,
    private productSharingService: ProductSharingService,
  ) {
  }

  ngOnInit() {
    this.addedProducts = this.productSharingService.getCartData();
  }

  redirectToCart() {
    this.router.navigate(['/checkout/cart']).then();
  }

  redirectToHome() {
    this.router.navigate(['/']).then();
  }
}
