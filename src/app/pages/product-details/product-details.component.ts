import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private id: number;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });

    TweenMax.to(".pd-details", 0.8, { ease: Power3.easeOut, y: 0 });
    TweenMax.to(".pd-photos", 0.8, { ease: Power3.easeOut, y: 0 });
    TweenMax.from(".form", 1.2, { delay: 0.3, ease: Power3.easeOut, opacity: 0, y: 100 });
    // TweenMax.from(".pd-photos-content", 1.2, { delay: 0.3, ease: Power3.easeOut, y: -100 });
    TweenMax.to(".continue-shopping", 0.8, { ease: Power3.easeOut, delay: 0.8, "min-width": "150px" });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
