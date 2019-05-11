import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule, MatButtonModule, MatFormFieldModule,
  MatInputModule, MatDialogModule } from '@angular/material';
import { NgxGalleryModule } from 'ngx-gallery';
import { ProductsListComponent } from './products-list/products-list.component';
import { CarouselComponent } from './challenges/carousel/carousel.component';
import { CarouselItemComponent } from './challenges/carousel/carousel-item/carousel-item.component';
import { ChallengesComponent } from './challenges/challenges.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxGalleryModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    ProductsListComponent,
    CarouselComponent,
    CarouselItemComponent,
    ChallengesComponent,
   ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgxGalleryModule,
    CarouselComponent,
    CarouselItemComponent,
    ChallengesComponent,
    ProductsListComponent
  ]
})
export class SharedModule { }
