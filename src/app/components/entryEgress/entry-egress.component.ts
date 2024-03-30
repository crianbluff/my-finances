import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { entryEgressReducerState } from './entry-egress.reducer';
import { DisabledLoadingAction, ActivateLoadingAction } from '../shared/user-interface.actions';
import { EntryEgressService } from 'src/app/services/entry-egress.service';
import { EntryEgress } from './entry-egress.model';

@Component({
  selector: 'app-entry-egress',
  templateUrl: './entry-egress.component.html',
  styles: []
})
export class EntryEgressComponent implements OnInit, OnDestroy {

  formEntryEgress:FormGroup;
  type:string = 'entry';
  loadingSubscription: Subscription = new Subscription();
  loading:boolean;

  constructor(
    public entryEgressService:EntryEgressService,
    public store:Store<entryEgressReducerState>,
  ) { }

  ngOnInit() {

    this.loadingSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );

    this.formEntryEgress = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  createEntryEgress() {

    this.store.dispatch( new ActivateLoadingAction() );

    const entryAndEgress:EntryEgress = new EntryEgress({ ...this.formEntryEgress.value, type: this.type });

    this.entryEgressService.createEntryEgress(entryAndEgress)
    .then(() => {
      this.store.dispatch( new DisabledLoadingAction() );
      this.formEntryEgress.reset();
      // entryAndEgress.description => sirve para si se quiere enviar la desc que se agrego
      this.entryEgressService.showAlert(`${ entryAndEgress.description } has been added successfully!`, true, 3500);
    })
    .catch(err => {
      console.error(err);
      this.store.dispatch( new DisabledLoadingAction() );
      this.entryEgressService.showAlert(err, false, 9000);
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}