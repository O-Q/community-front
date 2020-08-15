import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianDate'
})
export class PersianDatePipe implements PipeTransform {

  transform(date: string, ...args: unknown[]): string {
    return new Date(date).toLocaleDateString('fa-IR');
  }

}
