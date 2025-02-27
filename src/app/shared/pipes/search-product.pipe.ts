import { Pipe, PipeTransform } from '@angular/core';
import { IProduct, IProducts } from '../../core/interfaces/products/iproducts';

@Pipe({
  name: 'searchProduct',
})
export class SearchProductPipe implements PipeTransform {
  transform(value: IProduct[], searchValue: string): IProduct[] {
    return value.filter(
      (product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
