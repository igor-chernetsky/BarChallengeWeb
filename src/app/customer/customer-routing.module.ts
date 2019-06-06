import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerComponent } from './customer.component';
import { ChallengesListsComponent } from './challenges-lists/challenges-lists.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { ProviderComponent } from './provider/provider.component';

import { CustomerGuard, NotProviderGuard } from '../services/guards/auth.guard';

const customerRoutes: Routes = [
  { path: '', component: CustomerComponent,
    children: [
      { path: '', component: ChallengesListsComponent, canActivate: [NotProviderGuard] },
      { path: 'orders', component: OrdersComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'provider/:providerId', component: ProviderComponent,
        canActivate: [NotProviderGuard] },
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(customerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomerRoutingModule { }
