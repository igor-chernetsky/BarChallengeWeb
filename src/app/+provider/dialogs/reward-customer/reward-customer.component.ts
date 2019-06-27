import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { RewardService } from '../../../services/reward.service';
import { Provider } from '../../../entities/provider';

@Component({
  selector: 'app-reward-customer',
  templateUrl: './reward-customer.component.html',
  styleUrls: ['../../../shared/dialogs/dialogs.scss',
    './reward-customer.component.scss']
})
export class RewardCustomerComponent implements OnInit {
  public challenges = [];
  public listStatus = {noRedirect: true};
  public code: Number;
  public provider: Provider;
  public message = {
    text: '',
    isError: false
  };

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<RewardCustomerComponent>,
    private authService: AuthService,
    private rewardService: RewardService) { }

  public async ngOnInit() {
    this.provider = this.authService.getCurrentUser();
  }

  public async setCode() {
    this.message = { text: '', isError: false};
    this.challenges = await this.rewardService.getCustomerRewards(this.code);
    if (!this.challenges || !this.challenges.length) {
      this.message = {text: this.translate.instant("User doesn't have any reward"), isError: false};
    }
  }

  public close() {
    this.dialogRef.close();
  }

  public async productPicked(e, challengeId) {
    try {
      await this.rewardService.setReward({
        customerId: this.code,
        challengeId,
        rewardId: e.id
      });
    } catch (error) {
      this.message = {
        isError: true,
        text: this.translate.instant('Something went wrong, please try again')
      };
      this.code = undefined;
      this.challenges = [];
      return;
    }
    this.challenges = [];
    this.message = { text: 'Success', isError: false};
    setTimeout(() => {
      this.dialogRef.close(e);
    }, 1000);
  }

  public getChallengeRewards(challenge) {
    return challenge.products.filter(p => p.isReward);
  }

}
