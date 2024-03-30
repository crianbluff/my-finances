import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { SetItemsActions, UnsetItemsActions } from '../components/entryEgress/entry-egress-actions';
import { AuthService } from './auth.service';
import { EntryEgress } from '../components/entryEgress/entry-egress.model';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class EntryEgressService {

  entryEgresssListenerSubscription: Subscription = new Subscription();
  entryEgresssItemsSubscription: Subscription = new Subscription();

  constructor(
    private angularFirebase: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>,
  ) { }

  initEntryEgressListener() {
    this.entryEgresssListenerSubscription = this.store.select('auth')
    .pipe(
      filter( auth => auth.user != null )
    )
    .subscribe( auth => this.entryEgressItems(auth.user.uid) );
  }

  private entryEgressItems( uid:string ) {
    this.entryEgresssItemsSubscription = this.angularFirebase.collection(`${ uid }/entry-egress/items`)
    .snapshotChanges()
    .pipe(
      map( docData => {
        return docData.map( (docData:any) => {
          return {
            uid: docData.payload.doc.id,
            ...docData.payload.doc.data()
            // amount: docData.payload.doc.data()['amount']
          };
        });
      })
    )
    .subscribe( (collection:EntryEgress[]) => {
      this.store.dispatch( new SetItemsActions(collection) );
    });
  }

  cancelSubscription() {
    this.entryEgresssListenerSubscription.unsubscribe();
    this.entryEgresssItemsSubscription.unsubscribe();
    this.store.dispatch( new UnsetItemsActions() );
  }

  createEntryEgress( entryEgress:EntryEgress ) {
    const user = this.authService.getUser();
    return this.angularFirebase.doc(`${ user.uid }/entry-egress`).collection('items').add({...entryEgress});
  }

  removeEntryEgress( uid:string ) {
    const user = this.authService.getUser();
    return this.angularFirebase.doc(`${ user.uid }/entry-egress/items/${ uid }`).delete();
  }

  showAlert(title:string, isSuccess:boolean, timer:number) {

    let iconAlert:any = 'success';
    isSuccess === true ? iconAlert = 'success' : iconAlert = 'error';

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: iconAlert,
      title
    })
  }

}