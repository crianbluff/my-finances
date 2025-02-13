import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Services
import { AuthService } from '@services/auth/auth.service';

// Reducers
import { AppState } from '@app/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/styles/forms.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading:boolean = false;
  suscriptionUi:Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.suscriptionUi = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  onSubmit(data:any) {
    this.authService.login(data.email, data.password);
  }

  ngOnDestroy() {
    this.suscriptionUi.unsubscribe();
  }

}