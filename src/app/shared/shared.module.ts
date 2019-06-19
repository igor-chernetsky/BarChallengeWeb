import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatDialogModule, MatMenuModule } from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductsListComponent } from './products-list/products-list.component';
import { CarouselComponent } from './challenges/carousel/carousel.component';
import { CarouselItemComponent } from './challenges/carousel/carousel-item/carousel-item.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';

import { CustomFilterPipe } from '../pipe/custom-filter.pipe';
import { DaterPipe } from '../pipe/dater.pipe';

@NgModule({
  imports: [
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
    ImageUploaderComponent
   ],
  exports: [
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

    CustomFilterPipe,
    DaterPipe
  ]
})
export class SharedModule { }
