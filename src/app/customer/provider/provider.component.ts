import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { ProviderService } from '../../services/provider.service';
import { ProductService } from '../../services/product.service';
import { Provider } from '../../entities/provider';
import { Product } from '../../entities/product';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss']
})
export class ProviderComponent implements OnInit {
  public provider: Provider = new Provider();
  public products: Product[] = [];
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private productService: ProductService) { }

  public async ngOnInit() {
    const providerId = this.route.snapshot.params.providerId;
    if (providerId) {
      this.provider = await this.providerService.getProviderById(providerId);
    }
    this.galleryOptions = [
      { image: false, height: '400px', width: '100%', thumbnailsPercent: 30 },
      { breakpoint: 768, image: false, height: '200px', width: '100%', thumbnailsPercent: 30 }
    ];
    if (this.provider.images) {
      this.galleryImages = this.provider.images.map((i) => {
        return {
          small: i,
          medium: i,
          big: i
        };
      });
    }
    this.products = await this.productService.getProductsByProvider(this.provider.id);
  }

  // ----- private functions ------
}
