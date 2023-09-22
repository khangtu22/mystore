import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/interfaces/product.model';
import { DataService } from '../../services/data.service';
import { ProductService } from '../../services/product.service';
import { MessageService } from 'primeng/api';
import { ProductSharingService } from '../../services/product-sharing.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private dataService: DataService,
              private productService: ProductService,
              private messageService: MessageService,
              private productSharingService: ProductSharingService,
  ) {
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((data: Product[]) => {
      const existingProduct = data.map((product) => {
        return { ...product, quantity: 1 };
      });
      this.products = [...existingProduct];
    });
  }

  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added to cart successfully!' });
  }

  shareProduct(product: Product) {
    if (product) {
      // this.dataService.setCartData(product);
      this.productSharingService.addProduct(product);
      this.showToast();
    }
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
