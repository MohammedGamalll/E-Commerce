import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    currencyCode: string = 'USD',
    display: boolean = true,
    digitsInfo: string = '1.2-2',
    locale: string = 'en-US'
  ): string | null {
    if (value == null) return null;

    // Format the currency value
    let amount = Number(value);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: display ? 2 : 0,
    }).format(amount);
  }
}
