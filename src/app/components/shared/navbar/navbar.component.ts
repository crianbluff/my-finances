import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  subscription:Subscription = new Subscription();
  nameUser:string;

  constructor(
    public athService: AuthService,
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}