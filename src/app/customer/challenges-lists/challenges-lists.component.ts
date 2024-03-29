import { Component, OnInit } from '@angular/core';

import { BroadcasterService } from '../../services/broadcaster.service';
import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';

@Component({
  selector: 'challenges-lists',
  templateUrl: './challenges-lists.component.html',
  styleUrls: ['./challenges-lists.component.scss']
})
export class ChallengesListsComponent implements OnInit {
  public challenges: any = [];
  public myChallenges: any = [];

  constructor(
    private broadcaster: BroadcasterService,
    private challengeService: ChallengeService,
    private authService: AuthService) { }

  public async ngOnInit() {
    this.challenges = await this.challengeService.getChallenges();
    this.orderChallenges(this.challenges);
    this.initUserChallenges();
    this.broadcaster.on('customer:update').subscribe(() => {
      this.initUserChallenges();
    });
  }

  // ----- private functions ------
  private  async initUserChallenges() {
    const customer = this.authService.getCurrentUser();
    this.myChallenges = [];
    if (customer) {
      this.myChallenges = await this.challengeService.getUserChallenges(customer.id);
      this.orderChallenges(this.myChallenges);
    }
  }

  private orderChallenges(challenges) {
    challenges.forEach(c => {
      c.products.sort((a, b) => {
        if (a.isReward && !b.isReward) return 1;
        if (b.isReward && !a.isReward) return -1;
        return 0;
      });
    });
  }

}

