import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loading:boolean;
  suscription:Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );
  }

  onSubmit(data:any) {
    this.authService.login(data.email, data.password);
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}