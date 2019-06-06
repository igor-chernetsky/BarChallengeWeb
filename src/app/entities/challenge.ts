import { Provider } from './provider';
import { Product } from './product';

export class Challenge {
  id: number;
  name: string;
  provider: Provider;
  products: Product[] = [];
  rewards: Product[] = [];
}