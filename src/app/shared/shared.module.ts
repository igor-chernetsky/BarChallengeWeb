import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductsListComponent } from './products-list/products-list.component';
import { CarouselComponent } from './challenges/carousel/carousel.component';
import { CarouselItemComponent } from './challenges/carousel/carousel-item/carousel-item.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ProviderLogoComponent } from './provider-logo/provider-logo.component';

import { CustomFilterPipe } from '../pipe/custom-filter.pipe';
import { DaterPipe } from '../pipe/dater.pipe';

@NgModule({
  imports: [
    AgmCoreModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    NgxGalleryModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    ProductsListComponent,
    CarouselComponent,
    CarouselItemComponent,
    ChallengesComponent,

    CustomFilterPipe,
    DaterPipe,
    ImageUploaderComponent,
    ProviderLogoComponent
   ],
  exports: [
    AgmCoreModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    NgxGalleryModule,
    CarouselComponent,
    CarouselItemComponent,
    ChallengesComponent,
    ProductsListComponent,
    ImageUploaderComponent,
    ProviderLogoComponent,

    CustomFilterPipe,
    DaterPipe
  ]
})
export class SharedModule { }
