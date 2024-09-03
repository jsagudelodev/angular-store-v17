import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { WebsiteRoutingModule } from './website-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';

import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { QuicklinkModule } from 'ngx-quicklink';
@NgModule({
  declarations: [
    HomeComponent,

    MyCartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,

    ProductDetailComponent,
    LayoutComponent,
    NavComponent,
  ],
  imports: [CommonModule, WebsiteRoutingModule, SwiperModule, SharedModule],
})
export class WebsiteModule {}
