import { Pipe, PipeTransform } from '@angular/core';
import { APP_CONFIG } from '../../constants';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(
    value: number | string,
    currency: string = APP_CONFIG.CURRENCY.DEFAULT,
    display: 'symbol' | 'code' | 'name' = 'symbol'
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
      return '';
    }

    try {
      const formatter = new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: this.getCurrencyCode(currency),
        currencyDisplay: display,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      return formatter.format(numValue);
    } catch (error) {
      // Fallback formatting
      const symbol = APP_CONFIG.CURRENCY.SYMBOLS[currency as keyof typeof APP_CONFIG.CURRENCY.SYMBOLS] || currency;
      return `${symbol} ${numValue.toFixed(2)}`;
    }
  }

  private getCurrencyCode(currency: string): string {
    const currencyMap: Record<string, string> = {
      'ج.م': 'EGP',
      '$': 'USD',
      '€': 'EUR',
      'ر.س': 'SAR'
    };

    return currencyMap[currency] || currency;
  }
}
