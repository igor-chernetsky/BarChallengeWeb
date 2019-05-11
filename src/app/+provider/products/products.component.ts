import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { Provider } from '../../entities/provider';
import { Product } from '../../entities/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public provider: Provider = new Provider();
  public products: Product[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService) { }

  public async ngOnInit() {
    this.provider = this.authService.getCurrentUser();
    this.products = await this.productService.getProductsByProvider(this.provider.id);
  }

}
