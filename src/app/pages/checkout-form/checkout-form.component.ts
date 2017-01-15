import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from '../../services/cart.service'
import { UserService } from '../../services/user.service'

import * as _ from "lodash";

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {

  private cartProducts:any[] = [];
  private loadingCheckout:boolean = false;
  private showSuccessMessage:boolean = false;
  @Output() onClose = new EventEmitter();

  constructor(private user:UserService, private router: Router, private route: ActivatedRoute, private cart:CartService) { }

  ngOnInit() {
    // Opening animation
    TweenMax.to(".cf-details", 0.8, { ease: Power3.easeOut, y: 0 });
    TweenMax.to(".cf-photos", 0.8, { ease: Power3.easeOut, y: 0 });
    // TweenMax.from(".form", 1.2, { delay: 0.3, ease: Power3.easeOut, opacity: 0, y: -100 });
    TweenMax.to(".cf-continue-shopping", 0.8, { ease: Power3.easeOut, delay: 0.8, "min-width": "150px" });

    // Get cart products
    this.cartProducts = this.cart.cartProducts;

  }

  // Close animation
  public closeAnimation(){
    return new Promise((resolve, reject) => {
      TweenMax.to(".cf-details", 0.8, { ease: Power3.easeOut, y: "-100%" });
      TweenMax.to(".cf-continue-shopping", 0.3, { ease: Power3.easeOut, opacity: 0 });
      TweenMax.to(".cf-photos", 0.8, { ease: Power3.easeOut, y: "100%", onComplete: function(){
        resolve(true);
      } });
    });
  }

  // Close checout modal
  private closeCheckout(){
    var self = this;
    this.closeAnimation().then(function(){      
      self.onClose.emit(true);
    });
  }

  // Increase product Qtty
  private increaseQtty(product:any){
    this.cart.addProduct(product);    
  }

  // Decrease product Qtty
  private decreaseQtty(product:any){
    this.cart.removeProduct(product);
    TweenMax.fromTo(".checkout-badge", 1, { backgroundColor: "#DC3522" }, { backgroundColor: "#4D4D4D" });
  }

  // Calculate price subtotal
  private subtotalPrice(){
    return _.sumBy(this.cartProducts, function(o) {
      return o.qtty * o.price;
    });
  }

  // Checkout cart
  private checkoutCart(){
    var self = this;
    if (this.user.user){
      this.loadingCheckout = true;
      setTimeout(function() {
        self.cart.submitCart(self.user.user);
        self.cartProducts = [];
        self.loadingCheckout = false;
        self.showSuccessMessage = true;
        setTimeout(function() {
          self.showSuccessMessage = false;
          self.closeCheckout();
        }, 3000);
      }, 1500);
    }else{
      this.router.navigate(['/login/register']);
    }
  }




}
