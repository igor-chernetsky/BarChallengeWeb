import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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

  constructor(
    public dialogRef: MatDialogRef<RewardCustomerComponent>,
    private authService: AuthService,
    private rewardService: RewardService) { }

  public async ngOnInit() {
    this.provider = this.authService.getCurrentUser();
  }

  public async setCode() {
    this.challenges = await this.rewardService.getCustomerRewards(this.code);
    console.log(this.challenges);
  }

  public close() {
    this.dialogRef.close();
  }

  public productPicked(e) {
    this.dialogRef.close(e);
  }

  public getChallengeRewards(challenge) {
    return challenge.products.filter(p => p.isReward);
  }

}
