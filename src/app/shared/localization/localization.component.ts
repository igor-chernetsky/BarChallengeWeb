import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit {

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  public ngOnInit() {
  }

}
