import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { PaySuccessComponent } from './components/pay-success/pay-success.component';
import { ProductService } from './services/product.service';
import { DataService } from './services/data.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AddToCartComponent } from './utils/add-to-cart/add-to-cart.component';
import { CardModule } from 'primeng/card';
import { SingleProductComponent } from './utils/single-product/single-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    HomeComponent,
    ProductListComponent,
    PaySuccessComponent,
    ProductDetailComponent,
    AddToCartComponent,
    SingleProductComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    RouterOutlet,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    ButtonModule,
    ToastModule,
    CardModule,
  ],
  providers: [ProductService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
