import { Pipe, PipeTransform } from '@angular/core';
import { EntryEgress } from '../entry-egress.model';

@Pipe({
  name: 'orderEntryEgerss'
})
export class OrderEntryEgerssPipe implements PipeTransform {

  transform( items: EntryEgress[] ): EntryEgress[] {
    return items.sort( a => a.type === 'entry' ? -1 : 1);
  }

}