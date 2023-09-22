import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/interfaces/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MessageService } from 'primeng/api';
import { ProductSharingService } from '../../services/product-sharing.service';

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
              private productSharingService: ProductSharingService,
              private productService: ProductService,
              private messageService: MessageService,) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((data: Product[]) => {
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

  increaseQuantity(item: any) {
    item.quantity++;
  }

  getCurrentProduct(): Product {
    return <Product>this.products.find(product => product.id == this.id);
  }

  shareProduct(product: Product) {
    if (product) {
      this.productSharingService.addProduct(product);
      this.showToast();
    }
  }

  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added to cart successfully!' });
  }

  navigateToHome() {
    this.router.navigate(['/']).then();
  }

}
