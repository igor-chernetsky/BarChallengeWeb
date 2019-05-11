import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../../../entities/product';

@Component({
  selector: 'carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {
  @Input() public item: Product;
  @Input() public isExtra: boolean;

  constructor() { }

  public ngOnInit() {
  }

}
