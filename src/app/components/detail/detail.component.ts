import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

// Reducers
import { entryEgressReducerState } from '@earnings-expenses/reducers/earnings-expenses.reducer';

// Services
import { AlertsService } from '@shared/services/alerts/alerts.service';
import { EarningsExpensesService } from '@sh-services/earnings-expenses/earnings-expenses.service';

// Models
import { EntryEgress } from '@sh-models/earnings-expenses.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  totalEarnings:number = 0;
  totalExpenses:number = 0;
  howMuchEarnings:number = 0;
  howMuchExpenses:number = 0;

  itemsSubscription:Subscription = new Subscription();
  itemsEarningsExpenses:EntryEgress[];

  areItemsSortedByDescription:boolean = false;
  areItemsSortedByAmount:boolean = false;
  areItemsSortedByType:boolean = false;

  constructor(
    private store:Store<entryEgressReducerState>,
    public alertsService: AlertsService,
    public earningsExpensesServices: EarningsExpensesService
  ) { }

  ngOnInit() {
    this.itemsSubscription = this.store.select('entryEgress').subscribe(entryEgressItems => {
      
      this.itemsEarningsExpenses = [...entryEgressItems.items];
      this.totalEarnings = 0;
      this.totalExpenses = 0;
      this.howMuchEarnings = 0;
      this.howMuchExpenses = 0;

      this.itemsEarningsExpenses.forEach( item => {
        if ( item.type === 'entry' ) {
          this.totalEarnings += Number(item.amount);
          this.howMuchEarnings++;
        }
        if ( item.type === 'egress' ) {
          this.howMuchExpenses++;
          this.totalExpenses += Number(item.amount);
        }
      });
    });
  }

  sortByDescription() {
    this.areItemsSortedByDescription = !this.areItemsSortedByDescription;

    this.itemsEarningsExpenses.sort((a, b) => {
      // First, sort by type
      if (this.areItemsSortedByType) {
        if (a['type'] < b['type']) return -1;
        if (a['type'] > b['type']) return 1;
      }

      if (a['type'] < b['type']) return 1;
      if (a['type'] > b['type']) return -1;
      
      // If types are the same, sort by description
      return this.areItemsSortedByDescription ? a['description'].localeCompare(b['description']) : b['description'].localeCompare(a['description']);
    });
  }

  sortByAmount() {
    this.areItemsSortedByAmount = !this.areItemsSortedByAmount;

		this.itemsEarningsExpenses.sort((a, b) => {
      // First, sort by type
      if (this.areItemsSortedByType) {
        if (a['type'] < b['type']) return -1;
        if (a['type'] > b['type']) return 1;
      }

      if (a['type'] < b['type']) return 1;
      if (a['type'] > b['type']) return -1;
      
      // If types are the same, sort by amount
      return this.areItemsSortedByAmount ? a['amount'] - b['amount'] : b['amount'] - a['amount'];
    });
  }

  sortByType() {
    this.areItemsSortedByType = !this.areItemsSortedByType;
		
    // First, sort by type
    this.itemsEarningsExpenses.sort((a, b) => {

      if (this.areItemsSortedByType) {
        if (a['type'] < b['type']) return -1;
        if (a['type'] > b['type']) return 1;
      }

      if (a['type'] < b['type']) return 1;
      if (a['type'] > b['type']) return -1;
      
      // If types are the same, sort by amount
      return this.areItemsSortedByAmount ? a['amount'] - b['amount'] : b['amount'] - a['amount'];
    });
  }

  async confirmAlertToDeleteItemEntryEgress(item:EntryEgress) {
    let respAlertConfirm = await this.alertsService.showAlertWithConfirmation(`(${item['description']})`, item['type']);
    respAlertConfirm === true ? this.removeItemEarningExpense(item) : '';
  }

  removeItemEarningExpense( item:EntryEgress ) { 
    this.earningsExpensesServices.removeEarningExpense(item.uid)
    .then( () => this.alertsService.showAlert(`${ item.description } has been deleted successfully!`, true))
    .catch( err => {
      console.error(err);
      this.alertsService.showAlert(err, false);
    });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
  }

}