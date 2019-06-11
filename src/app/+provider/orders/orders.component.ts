import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase.service';
import { AuthService } from '../../services/auth.service';
import { RewardService } from '../../services/reward.service';
import { Purchase } from '../../entities/purchase';
import { Provider } from '../../entities/provider';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public provider: Provider = new Provider();
  public purchases: Purchase[] = [];
  public challenges = [];

  constructor(
    private authService: AuthService,
    private rewardService: RewardService,
    private purchaseService: PurchaseService) { }

  public ngOnInit() {
    this.provider = this.authService.getCurrentUser();
    this.initPurchases();
  }

  public async removePurchase(purchase) {
    const result = confirm(`Are you sure want to remove purchase of ${purchase.product.name}`);
    if (result) {
      try {
        await this.purchaseService.removePurchase(purchase.id);
        this.initPurchases();
      } catch (e) {
        console.log(e);
      }
    }
  }

  public getChallengeRewards(challenge) {
    return challenge.products.filter(p => p.isReward);
  }

  // ------ private functions -----

  private async initPurchases() {
    this.purchases = await this.purchaseService.getProviderPurchases(this.provider.id);
    this.challenges = await this.rewardService.getProviderRewards(this.provider.id);
  }

}
