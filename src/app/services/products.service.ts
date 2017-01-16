import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/map';

import * as _ from "lodash";


@Injectable()
export class ProductsService {

  constructor(private af: AngularFire, private http: Http) {}


  getProducts() {
    // Retriving data from firebase DB
    return this.af.database.object('/products', { preserveSnapshot: true});
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      this.getProducts().subscribe(
        products => {          
          var i =_.findIndex(products.val().products, function(o:any) { return o.id == id; });          
          resolve(products.val().products[i]);
        }
      );
    });
  }

}
