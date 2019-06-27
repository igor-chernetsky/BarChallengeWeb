import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { ProviderService } from '../../services/provider.service';

import { Product } from '../../entities/product';
import { Provider } from '../../entities/provider';
import { FormErrorStateMatcher } from '../../entities/errors';

@Component({
  selector: 'provider-product',
  templateUrl: './provider-product.component.html',
  styleUrls: ['./provider-product.component.scss']
})
export class ProviderProductComponent implements OnInit {
  public product: Product = new Product();
  public provider: Provider;
  public errorStateManager = new FormErrorStateMatcher();

  public state = 'show';
  public formControls = {
    nameFormControl: undefined,
    descriptionFormControl: undefined
  };

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private providerService: ProviderService,
    private productService: ProductService) { }

  public async ngOnInit() {
    this.provider = this.authService.getCurrentUser();
    const productId = this.route.snapshot.params.productId;
    if (productId) {
      this.product = await this.productService.getProductById(productId);
      if (this.provider.id !== this.product.provider.id) {
        this.router.navigate(['/profile']);
      }
    } else {
      this.product.provider = await this.providerService.getProviderById(this.provider.id);
      this.changeStatus('edit');
    }
  }

  public changeStatus(state: string) {
    if (state === 'edit') {
      this.formControls.nameFormControl = new FormControl(this.product.name || '',
        [Validators.required]);
      this.formControls.descriptionFormControl = new FormControl(this.product.description || '');
    }
    this.state = state;
  }

  public async saveProduct() {
    const editProduct = {...this.product};
    editProduct.name = this.formControls.nameFormControl.value;
    editProduct.description = this.formControls.descriptionFormControl.value;
    this.state = 'loading';
    try {
      this.product = await this.productService.saveProduct(editProduct);
      this.router.navigate(['profile', 'products']);
      this.state = 'show';
    } catch (e) {
      this.state = 'edit';
      console.error(e);
    }
  }

  public imageAdded(res) {
    this.product.image = res.imageUrl;
  }

  public removeImage() {
    this.product.image = undefined;
  }

}
