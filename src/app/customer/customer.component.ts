import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { AuthService } from '../services/auth.service';
import { BroadcasterService } from '../services/broadcaster.service';
import { Customer } from '../entities/customer';

import { LoginDialogComponent } from './dialogs/login/login.component';
import { ProviderLoginDialogComponent } from './dialogs/provider-login/provider-login.component';

@Component({
  selector: 'customer',  // <client></client>
  styleUrls: [ './customer.component.scss' ],
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  public localState = { value: '' };
  public customer: Customer = new Customer();

  constructor(
    private authService: AuthService,
    private broadcaster: BroadcasterService,
    private router: Router,
    public dialog: MatDialog) {}

  public ngOnInit() {
    this.customer = this.authService.getCurrentUser();
  }

  // ----- events -----
  public openLogin() {
    const dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.customer = user;
        this.broadcaster.broadcast('customer:update', this.customer);
      }
    });
  }

  public openProviderLogin() {
    const dialogRef = this.dialog.open(ProviderLoginDialogComponent);
    dialogRef.afterClosed().subscribe((user) => {
      if (user) {
        this.broadcaster.broadcast('provider:update', this.customer);
        this.router.navigate(['/profile']);
      }
    });
  }

  public logout() {
    this.authService.logout();
    this.customer = undefined;
    this.broadcaster.broadcast('customer:update');
  }

}
