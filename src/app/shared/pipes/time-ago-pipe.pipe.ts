import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';
@Pipe({
  name: 'timeAgoPipe',
})
export class TimeAgoPipePipe implements PipeTransform {
  transform(value: Date): string {
    return formatDistance(new Date(), value);
  }
}
