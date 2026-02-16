import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date, format: string = 'short'): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;
    
    if (isNaN(date.getTime())) return '';

    const options: Intl.DateTimeFormatOptions = this.getFormatOptions(format);
    
    try {
      return new Intl.DateTimeFormat('ar-EG', options).format(date);
    } catch (error) {
      return date.toLocaleDateString();
    }
  }

  private getFormatOptions(format: string): Intl.DateTimeFormatOptions {
    switch (format) {
      case 'short':
        return { year: 'numeric', month: 'short', day: 'numeric' };
      case 'long':
        return { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
      case 'time':
        return { hour: '2-digit', minute: '2-digit' };
      case 'date':
        return { year: 'numeric', month: 'long', day: 'numeric' };
      case 'datetime':
        return { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
      default:
        return { year: 'numeric', month: 'short', day: 'numeric' };
    }
  }
}
