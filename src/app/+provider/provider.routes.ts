import { ProviderComponent } from './provider.component';
import { ProfileComponent } from './profile/profile.component';
import { ProviderChallengesComponent } from './provider-challenges/provider-challenges.component';
import { ProviderProductComponent } from './provider-product/provider-product.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ChallengeComponent } from './challenge/challenge.component';

export const routes = [
  { path: '', component: ProviderComponent, children: [
    { path: '', component: ProfileComponent },
    { path: 'product', component: ProviderProductComponent },
    { path: 'product/:productId', component: ProviderProductComponent },
    { path: 'challenges', component: ProviderChallengesComponent },
    { path: 'challenge', component: ChallengeComponent },
    { path: 'challenge/:challengeId', component: ChallengeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
  ]},
];
