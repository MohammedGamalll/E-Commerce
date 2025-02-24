import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'egpCurrency',
})
export class EgpCurrencyPipe implements PipeTransform {
  transform(
    value: string | number | null | undefined,
    display: 'code' | 'symbol' | 'symbol-narrow' = 'symbol', // Accepts string values
    digitsInfo: string = '1.2-2',
    locale: string = 'en-EG' // Set locale to Egypt
  ): string | null {
    if (value == null) return null;

    // Format the currency value
    let amount = Number(value);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: display === 'symbol' ? 2 : 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }
}
