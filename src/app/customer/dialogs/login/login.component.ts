import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../../services/auth.service';
import { CustomerService } from '../../../services/customer.service';

class LoginErrorStateMatcher implements ErrorStateMatcher {
  public isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../shared/dialogs/dialogs.scss', './login.component.scss']
})
export class LoginDialogComponent implements OnInit {
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  public errorStateMatcher = new LoginErrorStateMatcher();
  public errorMessage = '';
  public state = 'login';

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router,
    private authService: AuthService,
    private customerService: CustomerService) { }

  public ngOnInit() {

  }

  public close() {
    this.dialogRef.close();
  }

  public async login() {
    if (!this.emailFormControl.errors && !this.passwordFormControl.errors) {
      const form = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      };
      try {
        let result;
        if (this.state === 'login') {
          result = await this.customerService.login(form);
        } else {
          result = await this.customerService.signup(form);
        }
        this.dialogRef.close(result);
      } catch(e) {
        this.errorMessage = 'Check Email and Password';
      }
    }
  }

  public changeState(state) {
    this.state = state;
    this.errorMessage = '';
  }

  // ------ private functions -----

}
