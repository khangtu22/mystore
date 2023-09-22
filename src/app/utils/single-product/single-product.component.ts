import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/interfaces/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
})
export class SingleProductComponent {
  @Input()
  product!: Product;
  @Output() decreaseQuantityEvent = new EventEmitter();
  @Output() increaseQuantityEvent = new EventEmitter();


  constructor(private router: Router) {
  }

  decreaseClick(){
    this.decreaseQuantityEvent.emit();
  }

  increaseClick(){
    this.increaseQuantityEvent.emit();
  }
  productDetail(productId: number) {
    this.router.navigate([`details/` + productId]).then();
  }

}
