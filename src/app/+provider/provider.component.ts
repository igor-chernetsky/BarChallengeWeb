import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { RewardCustomerComponent } from
  './dialogs/reward-customer/reward-customer.component';

import { AuthService } from '../services/auth.service';
import { BroadcasterService } from '../services/broadcaster.service';

import { Provider } from '../entities/provider';

@Component({
  selector: 'barrel',
  styleUrls: [ './provider.component.scss' ],
  templateUrl: './provider.component.html'
})
export class ProviderComponent implements OnInit {
  public provider: Provider;

  constructor(
    private router: Router,
    private authService: AuthService,
    private broadcaster: BroadcasterService,
    public dialog: MatDialog) {}

  public ngOnInit() {
  }

  public logout() {
    this.authService.logout();
    this.provider = undefined;
    this.broadcaster.broadcast('provider:update');
    this.router.navigate(['/']);
  }

  public makeReward() {
    const dialogRef = this.dialog.open(RewardCustomerComponent);
  }
}
