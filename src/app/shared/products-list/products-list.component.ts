import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../entities/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() public products: Product[];
  @Input() public providerMode: boolean;
  @Input() public noRedirect: boolean;
  @Output() public pickProduct = new EventEmitter();

  constructor(
    private router: Router,
    private productService: ProductService) {}

  public ngOnInit() {
  }

  public async removeProduct(e, product) {
    e.stopPropagation();
    try {
      await this.productService.removeProduct(product.id);
      this.products = this.products.filter((p) => p !== product);
    } catch (e) {
      console.log(e);
    }
  }

  public productSelected(event, product) {
    if (this.noRedirect) {
      event.stopPropagation();
    } else {
      const link = this.providerMode ? ['/profile/product', product.id] : ['/product', product.id];
      this.router.navigate(link);
    }
    this.pickProduct.emit(product);
  }

}
