import { Pipe, PipeTransform } from '@angular/core';
import { IOrders } from '../../core/interfaces/Orders/iorders';

@Pipe({
  name: 'reverseOrders'
})
export class ReverseOrdersPipe implements PipeTransform {

  transform(value: IOrders ): IOrders {
    return value.reverse();
  }

}
