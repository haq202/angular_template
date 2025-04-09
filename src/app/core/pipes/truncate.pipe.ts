import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value = '', limit = 50): string {
    return value && value.length > limit
      ? value.slice(0, limit) + '...'
      : value;
  }
}
