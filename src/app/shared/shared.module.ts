import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule } from '@ngx-translate/core';

import { MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductsListComponent } from './products-list/products-list.component';
import { CarouselComponent } from './challenges/carousel/carousel.component';
import { CarouselItemComponent } from './challenges/carousel/carousel-item/carousel-item.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { LocalizationComponent } from './localization/localization.component';
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
    TranslateModule,
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
    LocalizationComponent,
    ProviderLogoComponent,
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
    LocalizationComponent,
    ProductsListComponent,
    ImageUploaderComponent,
    ProviderLogoComponent,
    TranslateModule,

    CustomFilterPipe,
    DaterPipe
  ]
})
export class SharedModule { }
