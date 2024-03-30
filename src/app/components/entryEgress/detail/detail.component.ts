import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { entryEgressReducerState } from '../entry-egress.reducer';
import { EntryEgressService } from 'src/app/services/entry-egress.service';
import { EntryEgress } from '../entry-egress.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  itemsSubscription:Subscription = new Subscription();
  items:EntryEgress[];

  constructor(
    private store:Store<entryEgressReducerState>,
    public entryEgressServices: EntryEgressService
  ) { }

  ngOnInit() {
    this.itemsSubscription = this.store.select('entryEgress').subscribe( entryEgressItems => {
      this.items = entryEgressItems.items;
    });
  }

  removeItemEntryEgress( item:EntryEgress ) { 
    // item.description => en caso de que se quiera mostrar en una alerta la desc elimnada
    this.entryEgressServices.removeEntryEgress(item.uid)
    .then( () => this.entryEgressServices.showAlert(`${ item.description } has been deleted successfully!`, true, 5000) )
    .catch( err => {
      console.error(err);
      this.entryEgressServices.showAlert(err, false, 9000);
    });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

}