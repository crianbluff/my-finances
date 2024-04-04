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

  areItemsSortedByDescription:boolean = false;
  areItemsSortedByAmount:boolean = false;
  areItemsSortedByType:boolean = false;

  constructor(
    private store:Store<entryEgressReducerState>,
    public entryEgressServices: EntryEgressService
  ) { }

  ngOnInit() {
    this.itemsSubscription = this.store.select('entryEgress').subscribe( entryEgressItems => {
      this.items = entryEgressItems.items;
    });
  }

  sortByDescription() {
    this.areItemsSortedByDescription = !this.areItemsSortedByDescription;

    this.items.sort( (a, b) => {
      // First, sort by type
      if (a['type'] < b['type']) return 1;
      if (a['type'] > b['type']) return -1;
      
      // If types are the same, sort by description
      return this.areItemsSortedByDescription ? a['description'].localeCompare(b['description']) : b['description'].localeCompare(a['description']);
    });
  }

  sortByAmount() {
    this.areItemsSortedByAmount = !this.areItemsSortedByAmount;

		this.items.sort( (a, b) => {
      // First, sort by type
      if (a['type'] < b['type']) return 1;
      if (a['type'] > b['type']) return -1;
      
      // If types are the same, sort by amount
      return this.areItemsSortedByAmount ? b['amount'] - a['amount'] : a['amount'] - b['amount'];
    });
  }

  sortByType() {
    this.areItemsSortedByType = !this.areItemsSortedByType;
		this.items.sort(a => a['type'] === 'entry' && this.areItemsSortedByType ? 1 : -1);
  }

  async confirmAlertToDeleteItemEntryEgress(item:EntryEgress) {
    let respAlertConfirm = await this.entryEgressServices.showAlertWithConfirmation(`(${item['description']})`, item['type']);
    respAlertConfirm === true ? this.removeItemEntryEgress(item) : '';
  }

  removeItemEntryEgress( item:EntryEgress ) { 
    this.entryEgressServices.removeEntryEgress(item.uid)
    .then( () => this.entryEgressServices.showAlert(`${ item.description } has been deleted successfully!`, true, 5000))
    .catch( err => {
      console.error(err);
      this.entryEgressServices.showAlert(err, false, 9000);
    });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

}