import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/interfaces/product.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id: number | null = null;
  products: Product[] = [];
  currentProduct: Product | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private dataService: DataService,
              private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getData().subscribe((data: Product[]) => {
      this.products = data.map((product) => {
        if (product.id == this.id) {
          this.currentProduct = product;
        }
        return { ...product, quantity: 1 };
      });
    });
  }

  decreaseQuantity(item: Product) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotalPriceOfOneItem(product: Product): number {
    return product.price * product.quantity;
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'removed-to-cart-snackbar',
    });
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/data.json');
  }

  getCurrentProduct(): Product {
    return <Product>this.products.find(product => product.id == this.id);
  }

  shareProduct(product: Product) {
    if (product) {
      this.dataService.setCartData(product);
      this.onAddedMessageSuccess();
    }
  }

  onAddedMessageSuccess() {
    this.openSnackBar('Item added to cart successfully!', 'Dismiss');
  }

  navigateToHome() {
    this.router.navigate(['/']).then();
  }

}
