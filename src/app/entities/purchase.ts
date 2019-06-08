import { Provider } from './provider';
import { Product } from './product';

export class Purchase {
  id: number;
  provider: Provider;
  product: Product;
  createdAt: string;
  customerId: number;
}