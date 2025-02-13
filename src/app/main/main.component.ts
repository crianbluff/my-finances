import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Reducers
import { AppState } from '@app/app.reducer';

// Services
import { EarningsExpensesService } from '@sh-services/earnings-expenses/earnings-expenses.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  isSidebarCollapsed: boolean = true;
  subscription:Subscription = new Subscription();

  nameUser:string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private store: Store<AppState>,
    public athService: AuthService,
    public earningsExpensesService: EarningsExpensesService
  ) { }

  ngOnInit() {
    this.earningsExpensesService.initEarningsExpensesListener();

    this.subscription = this.store.select('auth')
    .pipe(filter( auth => auth.user != null ))
    .subscribe( auth => this.nameUser = auth.user.name );
  }

  toggleCollapsed({sideBarEl}) {
    this.document.body.classList.toggle('hide-scroll-y');
    sideBarEl.nativeElement.classList.toggle('active');
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logOut() {
    this.athService.logOut();
    this.document.body.classList.remove('hide-scroll-y');
    this.earningsExpensesService.cancelSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}