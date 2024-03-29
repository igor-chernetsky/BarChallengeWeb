import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  @Input() public challenges: any[] = [];
  @Input() public providerMode: boolean;

  constructor(
    public translate: TranslateService) { }

  public async ngOnInit() {
  }

}
