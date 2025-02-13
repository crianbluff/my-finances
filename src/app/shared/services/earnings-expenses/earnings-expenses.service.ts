import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// Reducers
import { AppState } from '@app/app.reducer';

// Actions
import { SetItemsActions, UnsetItemsActions } from '@earnings-expenses/actions/earnings-expenses-action';

// Services
import { AuthService } from '@services/auth/auth.service';

// Models
import { EntryEgress } from '@sh-models/earnings-expenses.model';

@Injectable({
  providedIn: 'root'
})
export class EarningsExpensesService {

  earningsExpensesListenerSubscription: Subscription = new Subscription();
  earningsExpensesItemsSubscription: Subscription = new Subscription();

  constructor(
    private angularFirebase: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>,
  ) { }

  initEarningsExpensesListener() {
    this.earningsExpensesListenerSubscription = this.store.select('auth')
    .pipe(filter( auth => auth.user != null ))
    .subscribe( auth => this.earningsExpensesItems(auth.user.uid) );
  }

  private earningsExpensesItems( uid:string ) {
    this.earningsExpensesItemsSubscription = this.angularFirebase.collection(`${ uid }/entry-egress/items`)
    .snapshotChanges()
    .pipe(map( docData => {
      return docData.map((docData:any) => {
        return {
          uid: docData.payload.doc.id,
          ...docData.payload.doc.data()
        };
      });
    }))
    .subscribe( (collection:EntryEgress[]) => {
      this.store.dispatch(new SetItemsActions(collection));
    });
  }

  cancelSubscription() {
    this.earningsExpensesListenerSubscription.unsubscribe();
    this.earningsExpensesItemsSubscription.unsubscribe();
    this.store.dispatch( new UnsetItemsActions() );
  }

  createEarningExpense( earningExpense:EntryEgress ) {
    const user = this.authService.getUser();
    return this.angularFirebase.doc(`${ user.uid }/entry-egress`).collection('items').add({...earningExpense});
  }

  editEarningExpense( earningExpense:EntryEgress ) {
    const user = this.authService.getUser();
    return this.angularFirebase.doc(`${ user.uid }/entry-egress`).collection('items').doc(earningExpense.uid).update({...earningExpense});
  }

  removeEarningExpense( uid:string ) {
    const user = this.authService.getUser();
    return this.angularFirebase.doc(`${ user.uid }/entry-egress/items/${ uid }`).delete();
  }

}