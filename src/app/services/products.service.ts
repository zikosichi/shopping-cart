import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import * as _ from "lodash";


@Injectable()
export class ProductsService {

  constructor(private http: Http) { }

  getProducts() {
    return this.http.get('./app/data.json')
      .map(response => response.json());
  }

  getProductById(id) {
    return new Promise((resolve, reject) => {
      this.getProducts().subscribe(
        products => {          
          var i =_.findIndex(products.products, function(o:any) { return o.id == id; });          
          resolve(products.products[i]);
        }
      );
    });
  }

}
