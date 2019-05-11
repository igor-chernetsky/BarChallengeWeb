import { Routes } from '@angular/router';
import { ClientComponent } from './client';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { ConsumerGuard, ProviderGuard } from './services/guards/auth.guard';

export const ROUTES: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'profile', loadChildren: './+provider/provider.module#ProviderModule',
    canActivate: [ProviderGuard]},
  { path: '**',    component: NoContentComponent },
];
