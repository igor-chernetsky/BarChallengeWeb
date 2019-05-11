import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Product } from '../../../entities/product';

@Component({
  selector: 'items-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() public items: Product[];
  @Input() public extra: Product[];
  public offset = 0;
  public size = 232;
  public hideNavigation = false;
  private carouselWidth: number;
  private contentWidth: number;
  private initialOffset: number;
  private blockAnimation: boolean;
  @ViewChild('offsetblock') private offsetblock: ElementRef;
  @ViewChild('content') private content: ElementRef;

  constructor() { }

  public ngOnInit() {
    this.setSizes();
  }

  public move(direction: number) {
    if (this.canMove(direction)) {
      this.offset += direction * this.size;
      this.setOffset();
    }
  }

  public canMove(direction: number) {
    if (this.carouselWidth > this.contentWidth ||
      direction > 0 && this.offset >= 0 ||
      direction < 0 && this.offset < (this.carouselWidth - this.contentWidth)) {
      return false;
    }
    return true;
  }

  public panstart(e) {
    this.initialOffset = this.offset;
  }

  public panend(e) {
    this.blockAnimation = false;
    this.setOffset();
  }

  public panmove(e) {
    this.blockAnimation = true;
    this.offset = this.initialOffset + e.deltaX;
    this.setOffset();
  }

  @HostListener('window:resize', ['$event'])
  public setSizes() {
    this.size = window.innerWidth > 768 ? 342 : 250;
    this.carouselWidth = this.offsetblock.nativeElement.offsetWidth;
    this.contentWidth = this.size * this.items.length;
    this.offset = 0;
    this.hideNavigation = this.carouselWidth > this.contentWidth;
  }

  // ----- private functions -----

  private setOffset() {
    if (this.offset > 0) {
      this.offset = 0;
    }
    const maxOffset = this.carouselWidth - this.contentWidth - 20;
    if (this.offset < maxOffset) {
      this.offset = maxOffset;
    }
  }

}
