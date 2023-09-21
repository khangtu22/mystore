import { Product } from '../models/interfaces/product.model';

export class ProductService {
  getTotalPrice(products: Product[]): number {
    return products.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
