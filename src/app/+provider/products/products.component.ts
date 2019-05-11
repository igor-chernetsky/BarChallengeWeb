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
  public listState = {
    providerMode: true,
    isRemovable: true,
    noRedirect: true
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private productService: ProductService) { }

  public async ngOnInit() {
    this.provider = this.authService.getCurrentUser();
    this.products = await this.productService.getProductsByProvider(this.provider.id);
  }

  public async removeProduct(product) {
    try {
      await this.productService.removeProduct(product.id);
      this.products = this.products.filter((p) => p !== product);
    } catch (e) {
      console.log(e);
    }
  }

  public editProduct(product) {
    this.router.navigate(['/profile', 'product', product.id]);
  }

  public productPicked(product) {
    alert(product.name);
  }

}
