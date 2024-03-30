import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { EntryEgressService } from 'src/app/services/entry-egress.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nameUser:string;
  subscription:Subscription = new Subscription();

  constructor(
    public athService: AuthService,
    public entryEgressService: EntryEgressService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( auth => this.nameUser = auth.user.name );
  }

  logOut() {
    this.athService.logOut();
    this.entryEgressService.cancelSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}