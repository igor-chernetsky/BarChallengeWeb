import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ProviderService } from '../../../../services/provider.service';
import { FormErrorStateMatcher } from '../../../../entities/errors';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() public close = new EventEmitter();
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  public errorStateMatcher = new FormErrorStateMatcher();
  public errorMessage = '';

  constructor(
    public translate: TranslateService,
    private router: Router,
    private providerService: ProviderService) { }

  public ngOnInit() {

  }

  public closeDialog() {
    this.close.emit();
  }

  public async login() {
    if (!this.emailFormControl.errors && !this.passwordFormControl.errors) {
      const form = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      };
      try {
        const result = await this.providerService.login(form);
        this.close.emit(result);
      } catch (e) {
        this.errorMessage = 'Check Email and Password';
      }
    }
  }

}
