import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'provider-logo',
  templateUrl: './provider-logo.component.html',
  styleUrls: ['./provider-logo.component.scss']
})
export class ProviderLogoComponent implements OnInit {
  @Input() public logo: string;
  @Input() public small: boolean;

  constructor() { }

  ngOnInit() {
  }

}
