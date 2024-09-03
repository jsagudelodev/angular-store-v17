import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { TimeAgoPipePipe } from './pipes/time-ago-pipe.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { ImgComponent } from '../shared/components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductsComponent } from '../shared/components/products/products.component';

@NgModule({
  declarations: [
    TimeAgoPipePipe,
    ReversePipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    TimeAgoPipePipe,
    ReversePipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent,
  ],
})
export class SharedModule {}
