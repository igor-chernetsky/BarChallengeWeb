import { Provider } from './provider';

export class Product {
  public id: number;
  public name: string;
  public image: string;
  public description: string;
  public provider: Provider;
  public status: string;
}
