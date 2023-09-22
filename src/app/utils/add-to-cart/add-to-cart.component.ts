import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent {
  @Output() addToCartEvent = new EventEmitter();

  onAddToCartClick(){
    this.addToCartEvent.emit();
  }
}
