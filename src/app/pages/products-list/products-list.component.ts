import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  private products: any[] = [];
  private filters: string[] = ['ALL', 'WOMEN', 'MEN'];
  private productsFilter: string = 'ALL';

  constructor(
    private Products: ProductsService,
    private cart: CartService
  ) { }


  ngOnInit() {

    // Getting products
    this.Products.getProducts().subscribe(
      products => {
        this.products = products.val().products;
      },
      error => console.error('Error: ' + error),
      () => console.log('Completed!')
    );
  }

  addProduct(product: any, event: any) {
    this.cart.addProduct(product);
    TweenMax.fromTo(event.target, 1, { backgroundColor: "#5ce23b" }, { backgroundColor: "#DC3522" });
    TweenMax.fromTo(".checkout-badge", 1, { backgroundColor: "#5ce23b" }, { backgroundColor: "#4D4D4D" });
  }

  selectFilter(filter){
    this.productsFilter = filter;
  }

}
