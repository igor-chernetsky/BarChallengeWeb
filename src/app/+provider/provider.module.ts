import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './provider.routes';
import { ProviderComponent } from './provider.component';
import { ProfileComponent } from './profile/profile.component';
import { ProviderProductComponent } from './provider-product/provider-product.component';
import { ProviderChallengesComponent } from './provider-challenges/provider-challenges.component';
import { ProductsComponent } from './products/products.component';
import { ProductPickerComponent } from './dialogs/product-picker/product-picker.component';

import { SharedModule } from '../shared/shared.module';
import { ChallengeComponent } from './challenge/challenge.component';

@NgModule({
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    ProviderComponent,
    ProfileComponent,
    ProviderProductComponent,
    ProviderChallengesComponent,
    ProductsComponent,
    ChallengeComponent,
    ProductPickerComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [
    ProductPickerComponent
  ]
})
export class ProviderModule {
  public static routes = routes;
}
