import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomerRoutingModule } from './customer-routing.module';

import { CustomerComponent } from './customer.component';
import { LoginDialogComponent } from './dialogs/login/login.component';
import { LoginFormComponent } from './dialogs/provider-login/login-form/login-form.component';
import { ChallengesListsComponent } from './challenges-lists/challenges-lists.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { ProviderComponent } from './provider/provider.component';
import { ProviderLoginDialogComponent } from './dialogs/provider-login/provider-login.component';
import { SignupFormComponent } from './dialogs/provider-login/signup-form/signup-form.component';

import 'hammerjs';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomerComponent,
    ChallengesListsComponent,
    LoginDialogComponent,
    LoginFormComponent,
    OrdersComponent,
    ProductComponent,
    ProviderLoginDialogComponent,
    ProviderComponent,
    SignupFormComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
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
