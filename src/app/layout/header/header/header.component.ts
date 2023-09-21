import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/interfaces/product.model';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  addedProducts: Product[] = [];

  constructor(
    private router: Router,
    private dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.addedProducts = this.dataService.getCartData();
  }

  redirectToCart() {
    this.router.navigate(['/checkout/cart']).then();
  }

  redirectToHome() {
    this.router.navigate(['/']).then();
  }
}
