import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor() { }

  private products: any[] = [1,2,3,4,5,67,7,8,9,9,3,3,2,7,2,3,5,6];

  ngOnInit() {
    console.log("asd");
    
  }

}
