import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import * as _ from "lodash";

@Injectable()
export class CartService {

  public cartProducts: any[] = [];
  public totalQtty: number = 0;

  constructor(private af: AngularFire) {
    // Update cart from local storage
    this._getCartFromLocalStorage();
  }

  // Function to add new product in cart
  public addProduct(product: any) {
    var i = _.findIndex(this.cartProducts, ['id', product.id]);
    if (i == -1) {
      product.qtty = 1;
      this.cartProducts.push(product);
    } else {
      this.cartProducts[i].qtty++;
    }
    // Total products qtty in cart
    this.totalQtty++;
    // Update cart in local storage
    this._updateLocalStorage();
  }

  // Function to remove new product in cart
  public removeProduct(product: any) {
    var i = _.findIndex(this.cartProducts, ['id', product.id]);

    if (i !== -1) {
      if (product.qtty == 1) {
        this.cartProducts.splice(i, 1);
      } else {
        product.qtty--;
      }
    }
    // Total products qtty in cart
    this.totalQtty--;
    // Update cart in local storage
    this._updateLocalStorage();
  }

  public submitCart(user:any){
    var self = this;
    var productsRef = this.af.database.list('/orders');
    productsRef.push({
      userId: user.uid,
      userEmail: user.email,
      products: self.cartProducts
    })
    .then(_ => {
      self._clearCart();
      console.log('success');
    })
    .catch(err => console.log(err, 'You do not have access!'));
  }

  private _clearCart(){
    this.cartProducts = [];
    this.totalQtty = 0;
    this._updateLocalStorage();
  }

  // Save cart properties in localstorage
  private _updateLocalStorage(){
    var s = JSON.stringify({
      cartProducts: this.cartProducts,
      totalQtty: this.totalQtty
    });

    localStorage.setItem('ss-cart', s);
  }

  // Get cart data from local storage
  private _getCartFromLocalStorage(){
    var cartDataString = localStorage.getItem('ss-cart');
    if (cartDataString) {
      var cartDataJson = JSON.parse(cartDataString);
      this.cartProducts = cartDataJson.cartProducts;
      this.totalQtty = cartDataJson.totalQtty;      
    }
  }

}
