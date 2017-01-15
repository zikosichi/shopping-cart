import { Component, ViewChild } from '@angular/core';
import { CheckoutFormComponent } from './pages/checkout-form/checkout-form.component';
import {Router} from '@angular/router';

import { CartService } from './services/cart.service'
import { UserService } from './services/user.service'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	@ViewChild('checoutForm') checkout: CheckoutFormComponent;
	private checkoutVisible: boolean = false;

	constructor (private router:Router, private cart:CartService, private user:UserService){
		var self = this;
		router.events.subscribe((val) => {
			self.removeCheckout();
			
		});
	}

	private toggleCheckoutForm() {
		var self = this;
		
		// Do not show checkout form if we are on login page
		if (this.router.url == '/login/login' || this.router.url == '/login/register'){ return false; }
		
		// If we are going to show checkout form we just make it visible
		// If we are hiding it first we need to animate and then remove it
		if (this.checkoutVisible == false) {
			this.checkoutVisible = true;
		} else {
			this.checkout.closeAnimation().then(result => {
				self.checkoutVisible = false;
			});
		}

	}

	// Hide checkout
	private removeCheckout(){
		this.checkoutVisible = false;
	}

	private logOut(){
		this.user.logOut();
		this.router.navigate(['/']);
	}
}
