import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderByType'
})
export class OrderByTypePipe implements PipeTransform {

  transform( items:any[], args?:any ) {
    return items.sort( (a, b) => a[args] < b[args] ? 1 : -1);
  }

}