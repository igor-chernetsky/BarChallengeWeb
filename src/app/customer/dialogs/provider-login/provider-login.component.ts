import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'provider-login',
  templateUrl: './provider-login.component.html',
  styleUrls: ['./provider-login.component.scss']
})
export class ProviderLoginDialogComponent implements OnInit {
  public state = 'login';
  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ProviderLoginDialogComponent>,
    private router: Router) { }

  public ngOnInit() {

  }

  public close(user) {
    this.dialogRef.close(user);
  }

  // ------ private functions -----

}
