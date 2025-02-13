import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Reducers
import { entryEgressReducerState } from '@earnings-expenses/reducers/earnings-expenses.reducer';

// Actions
import { DisabledLoadingAction, ActivateLoadingAction } from '@earnings-expenses/actions/user-interface.action';

// Services
import { AlertsService } from '@shared/services/alerts/alerts.service';
import { EarningsExpensesService } from '@sh-services/earnings-expenses/earnings-expenses.service';

// Models
import { EntryEgress } from '@sh-models/earnings-expenses.model';

@Component({
  selector: 'app-add-earnings-expenses',
  templateUrl: './add-earnings-expenses.component.html',
  styleUrls: ['../../shared/styles/forms.css']
})
export class AddEarningsExpensesComponent implements OnInit, OnDestroy {

  formEarningsExpenses:FormGroup;
  type:string = 'entry';
  loadingSubscription: Subscription = new Subscription();
  loading:boolean;

  constructor(
    public alertsService: AlertsService,
    public earningsExpensesService:EarningsExpensesService,
    public store:Store<entryEgressReducerState>,
  ) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );

    this.formEarningsExpenses = new FormGroup({
      description: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  createEntryEgress() {
    this.store.dispatch( new ActivateLoadingAction() );
    const entryAndEgress:EntryEgress = new EntryEgress({ ...this.formEarningsExpenses.value, type: this.type });
    
    this.earningsExpensesService.createEarningExpense(entryAndEgress)
    .then(() => {
      this.store.dispatch( new DisabledLoadingAction() );
      this.formEarningsExpenses.reset();
      // entryAndEgress.description => sirve para si se quiere enviar la desc que se agrego
      this.alertsService.showAlert(`${ entryAndEgress.description } has been added successfully!`, true);
    })
    .catch(err => {
      console.error(err);
      this.store.dispatch( new DisabledLoadingAction() );
      this.alertsService.showAlert(err, false);
    });
  }

  toggleType(type:string) {
    this.type = type;
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}