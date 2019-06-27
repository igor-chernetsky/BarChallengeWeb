import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ProviderService } from '../../../../services/provider.service';
import { FormErrorStateMatcher } from '../../../../entities/errors';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Output() public close = new EventEmitter();
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public nameFormControl = new FormControl('', [
    Validators.required,
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

  public async signup() {
    if (!this.emailFormControl.errors && !this.passwordFormControl.errors) {
      const form = {
        name: this.nameFormControl.value,
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      };
      try {
        const result = await this.providerService.signup(form);
        this.close.emit(result);
      } catch(e) {
        this.errorMessage = 'Something happened, please try again later';
        if (e._body) {
          const errorBody = JSON.parse(e._body);
          if (errorBody.message && errorBody.message === 'UserExistsError') {
            this.errorMessage = 'User already exists';
          }
        }
      }
    }
  }
}
