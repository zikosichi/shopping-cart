import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CheckoutFormComponent } from './pages/checkout-form/checkout-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { ProductsFilterPipe } from './services/products-filter.pipe';

const myFirebaseConfig = {
  apiKey: 'AIzaSyBq4MIMRk5rBQx7sbJma2chHxxyRGoQrYc',
  authDomain: 'simple-shopping-b2d1c.firebaseapp.com',
  databaseURL: 'https://simple-shopping-b2d1c.firebaseio.com'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

const appRoutes: Routes = [
  {
    path: 'login/:login',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ProductsListComponent,
    children: [
      { path: 'product-details/:id', component: ProductDetailsComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/products',
    pathMatch: 'full'

  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    CheckoutFormComponent,
    LoginComponent,
    ProductsFilterPipe
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [
    ProductsService,
    CartService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
