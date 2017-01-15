import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
      // filter items array, items which match and return true will be kept, false will be filtered out
      return items.filter(item => (item.category === filter) || (filter === 'ALL'));
  }

}
