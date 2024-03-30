import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading:boolean;
  suscription:Subscription = new Subscription();

  constructor(
    public authService: AuthService,
    public store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.suscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );
  }

  onSubmit(data:any) {
    this.authService.createUser(data.name, data.email, data.password);
  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

}