import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../entities/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) { }

  public async ngOnInit() {
    const productId = this.route.snapshot.params.productId;
    if (productId) {
      this.product = await this.productService.getProductById(productId);
    }
  }

}
