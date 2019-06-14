import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProductPickerComponent } from '../dialogs/product-picker/product-picker.component';

import { Challenge } from '../../entities/challenge';
import { Provider } from '../../entities/provider';
import { FormErrorStateMatcher } from '../../entities/errors';

import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  public challenge: Challenge = new Challenge();
  public provider: Provider;
  public formControls = {
    nameFormControl: new FormControl()
  };
  public isEditing: boolean;
  public listStatus = {isRemovable: true};
  public errorStateMatcher = new FormErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private providerService: ProviderService,
    private challengeService: ChallengeService,
    public dialog: MatDialog) {}

  public async ngOnInit() {
    this.provider = this.authService.getCurrentUser();
    const challengeId = this.route.snapshot.params.challengeId;
    if (challengeId) {
      this.challenge = await this.challengeService.getChallengeById(challengeId);
      if (this.provider.id !== this.challenge.provider.id) {
        this.router.navigate(['/profile']);
      }
    } else {
      this.challenge.provider = await this.providerService.getProviderById(this.provider.id);
    }
    this.formControls.nameFormControl = new FormControl(this.challenge.name || '',
      [Validators.required]);
  }

  public addProduct(e, isReward) {
    e.stopPropagation();
    const dialogRef = this.dialog.open(ProductPickerComponent);
    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        product.isReward = isReward;
        this.challenge.products = [...this.challenge.products, product];
        this.isEditing = true;
      }
    });
  }

  public removeProduct(product) {
    this.challenge.products = this.challenge.products.filter((p) => p !== product);
    this.isEditing = true;
  }

  public async saveChallente() {
    const editChallenge = {...this.challenge};
    editChallenge.name = this.formControls.nameFormControl.value;
    try {
      this.challenge = await this.challengeService.saveChallenge(editChallenge);
      this.router.navigate(['profile', 'challenges']);
    } catch (e) {
      console.error(e);
    }
  }

  public productPicked(product) {
    this.router.navigate(['/profile', 'product', product.id]);
  }

}
