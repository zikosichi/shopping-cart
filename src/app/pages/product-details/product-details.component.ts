import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private id: number;
  private sub: any;

  private product: any = {};

  constructor(
    private products:ProductsService,
    private route: ActivatedRoute,
    private cart: CartService,
    private router: Router) { }

  ngOnInit() {
    var self = this;
    this.sub = this.route.params.subscribe(params => {
      
      self.id = params['id'];

      self.products.getProductById(self.id).then(function(response){
        self.product = response;
      });

    });

    // Opening animation
    TweenMax.to(".pd-details", 0.8, { ease: Power3.easeOut, y: 0 });
    TweenMax.to(".pd-photos", 0.8, { ease: Power3.easeOut, y: 0 });
    TweenMax.from(".form", 1.2, { delay: 0.3, ease: Power3.easeOut, opacity: 0, y: 100 });
    TweenMax.to(".continue-shopping", 0.8, { ease: Power3.easeOut, delay: 0.8, "min-width": "150px" });

  }

  // Close details modal
  public closeDetails(){
    var self = this;
    TweenMax.to(".pd-details", 0.8, { ease: Power3.easeOut, y: "-100%", opacity: 0 });
    TweenMax.to(".pd-continue-shopping", 0.3, { ease: Power3.easeOut, opacity: 0 });
    TweenMax.to(".pd-photos", 0.8, { ease: Power3.easeOut, y: "100%",  opacity: 0, onComplete: function(){
        self.router.navigate(['/']);
    } });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addProduct(product: any, event: any) {
    this.cart.addProduct(product);
    TweenMax.fromTo(event.target, 1, { backgroundColor: "#5ce23b" }, { backgroundColor: "#DC3522" });
    TweenMax.fromTo(".checkout-badge", 1, { backgroundColor: "#5ce23b" }, { backgroundColor: "#4D4D4D" });
  }

}
