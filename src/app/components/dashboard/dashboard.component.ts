import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// Reducers
import { entryEgressReducerState } from '@earnings-expenses/reducers/earnings-expenses.reducer';
import { Subscription } from 'rxjs';

// Models
import { EntryEgress } from '@sh-models/earnings-expenses.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public doughnutChartLabels: string[] = ['Earnings', 'Expenses'];
  public doughnutChartData: number[] = [];
  
  statisticsSuscription:Subscription = new Subscription();

  earnings:number;
  expenses:number;
  howMuchEarnings:number;
  howMuchExpenses:number;

  constructor(
    private store: Store<entryEgressReducerState>
  ) {
  }
  
  ngOnInit() {
    this.statisticsSuscription = this.store.select('entryEgress').subscribe( entryEgress => this.countentryEgress(entryEgress.items));
  }

  countentryEgress( items: EntryEgress[] ) {
    this.earnings = 0;
    this.expenses = 0;
    this.howMuchEarnings = 0;
    this.howMuchExpenses = 0;

    items.forEach( item => {
      if ( item.type === 'entry' ) {
        this.howMuchEarnings++;
        this.earnings += Number(item.amount);
      }

      if ( item.type === 'egress' ) {
        this.howMuchExpenses++;
        this.expenses += Number(item.amount);
      }
    });

    this.doughnutChartData = [this.earnings, this.expenses];
  }

}