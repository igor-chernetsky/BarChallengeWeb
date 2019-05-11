import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ChallengeService } from '../../services/challenge.service';
import { Provider } from '../../entities/provider';

@Component({
  selector: 'app-provider-challenges',
  templateUrl: './provider-challenges.component.html',
  styleUrls: ['./provider-challenges.component.scss']
})
export class ProviderChallengesComponent implements OnInit {
  public provider: Provider = new Provider();
  public challenges: any[] = [];

  constructor(
    private authService: AuthService,
    private challengesService: ChallengeService) { }

  public async ngOnInit() {
    this.provider = this.authService.getCurrentUser();
    this.challenges = await this.challengesService.getProviderChallenges(this.provider.id);
  }

}
