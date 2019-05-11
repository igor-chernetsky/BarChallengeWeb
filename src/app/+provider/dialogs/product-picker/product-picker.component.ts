import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../entities/product';

@Component({
  selector: 'app-product-picker',
  templateUrl: './product-picker.component.html',
  styleUrls: ['./product-picker.component.scss']
})
export class ProductPickerComponent implements OnInit {
  public products: Product[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProductPickerComponent>,
    private authService: AuthService,
    private productService: ProductService) { }

  public async ngOnInit() {
    const provider = this.authService.getCurrentUser();
    this.products = await this.productService.getProductsByProvider(provider.id);
  }

  public close() {
    this.dialogRef.close();
  }

  public productPicked(e) {
    this.dialogRef.close(e);
  }

}
