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
  @Input() public state = {
    noRedirect: false,
    providerMode: false,
    isRemovable: false
  };
  @Output() public pickProduct = new EventEmitter();
  @Output() public remove = new EventEmitter();
  @Output() public edit = new EventEmitter();

  constructor(
    private router: Router,
    private productService: ProductService) {}

  public ngOnInit() {
  }

  public removeProduct(e, product) {
    e.stopPropagation();
    this.remove.emit(product);
  }

  public editProduct(e, product) {
    e.stopPropagation();
    this.edit.emit(product);
  }

  public productSelected(event, product) {
    if (this.state.noRedirect) {
      event.stopPropagation();
    } else {
      const link = this.state.providerMode ? ['/profile/product', product.id] : ['/product', product.id];
      this.router.navigate(link);
    }
    this.pickProduct.emit(product);
  }

}
