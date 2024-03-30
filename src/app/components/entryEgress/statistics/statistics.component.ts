import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { entryEgressReducerState } from '../entry-egress.reducer';
import { Subscription } from 'rxjs';
import { EntryEgress } from '../entry-egress.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [],
})
export class StatisticsComponent implements OnInit {

  public doughnutChartLabels: string[] = ['Earnings', 'Expenses'];
  public doughnutChartData: number[] = [];
  
  statisticsSuscription:Subscription = new Subscription();

  entries:number;
  expenses:number;

  howMuchEntries:number;
  howMuchExpenses:number;

  constructor(
    private store: Store<entryEgressReducerState>
  ) { }

  ngOnInit() {    
    this.statisticsSuscription = this.store.select('entryEgress').subscribe( entryEgress => this.countentryEgress(entryEgress.items));
  }

  countentryEgress( items: EntryEgress[] ) {
    this.entries = 0;
    this.expenses = 0;
    this.howMuchEntries = 0;
    this.howMuchExpenses = 0;

    items.forEach( item => {
      if ( item.type === 'entry' ) {
        this.howMuchEntries ++;
        this.entries += item.amount;
      }

      if ( item.type === 'egress' ) {
        this.howMuchExpenses ++;
        this.expenses += item.amount;
      }
    });

    this.doughnutChartData = [this.entries, this.expenses];
  }

}