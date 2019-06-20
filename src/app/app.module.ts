import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AgmCoreModule } from '@agm/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { AuthService } from './services/auth.service';
import { BroadcasterService } from './services/broadcaster.service';
import { ChallengeService } from './services/challenge.service';
import { StorageService } from './services/storage.service';
import { CustomerService } from './services/customer.service';
import { RewardService } from './services/reward.service';

import { CustomerModule } from './customer/customer.module';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    NoContentComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    CustomerModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    NgxWebstorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWFy4A4rCpfy5XUU7IBQewqElZKP43g_Q'
    })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    AuthService,
    BroadcasterService,
    ChallengeService,
    StorageService,
    CustomerService,
    RewardService
  ]
})
export class AppModule {}
