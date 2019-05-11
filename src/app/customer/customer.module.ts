import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsumerRoutingModule } from './consumer-routing.module';

import { CustomerComponent } from './customer.component';
import { LoginDialogComponent } from './dialogs/login/login.component';
import { ChallengesListsComponent } from './challenges-lists/challenges-lists.component';
import { ProductComponent } from './product/product.component';
import { ProviderComponent } from './provider/provider.component';
import { ProviderLoginDialogComponent } from './dialogs/provider-login/provider-login.component';

import 'hammerjs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerComponent,
    LoginDialogComponent,
    ChallengesListsComponent,
    ProductComponent,
    ProviderLoginDialogComponent,
    ProviderComponent,
  ],
  imports: [
    CommonModule,
    ConsumerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    LoginDialogComponent,
    ProviderLoginDialogComponent
  ]
})
export class CustomerModule { }
