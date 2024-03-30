import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ActivateLoadingAction, DisabledLoadingAction } from '../components/shared/user-interface.actions';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { User } from '../components/auth/user.model';
import { AppState } from '../app.reducer';
import { SetUserAction, UnsetUserAction } from '../components/auth/auth.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription:Subscription = new Subscription();
  private user:User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private angularFireDb: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (firebaseUser:firebase.User) => {
      if ( firebaseUser ) {
        this.userSubscription = this.angularFireDb.doc(`${ firebaseUser.uid }/user`).valueChanges()
        .subscribe( (userFirebase:User) => {
          const newUser = new User(userFirebase);
          this.store.dispatch( new SetUserAction(newUser) );
          this.user = newUser;
        });
      } else {
          this.user = null;
          this.userSubscription.unsubscribe();
        }
    });
  }

  createUser(name:string, email:string, password:string) {

    this.store.dispatch( new ActivateLoadingAction() );

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( resp => {
      const user:User = {
        uid: resp.user.uid,
        email: resp.user.email,
        name
      };

      this.angularFireDb.doc(`${ user.uid }/user`)
      .set( user )

      .then( () => {
        this.router.navigate(['/dashboard']);
        this.store.dispatch( new DisabledLoadingAction() );
      })
      
      .catch( err => {
        console.error(err);
        this.store.dispatch( new DisabledLoadingAction() );
      });
    })
    .catch(err => {
      console.error(err);
      this.store.dispatch( new DisabledLoadingAction() );
      this.showAlertError('Error when the user was created!', err);
    });
  }

  login(email:string, password:string) {

    this.store.dispatch( new ActivateLoadingAction() );

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then( resp => {
      this.router.navigate(['/dashboard']);
      this.store.dispatch( new DisabledLoadingAction() );
    })

    .catch(err => {
      console.error(err);
      this.store.dispatch( new DisabledLoadingAction() );
      this.showAlertError('Error trying to login!', err);
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
    this.store.dispatch( new UnsetUserAction() );
  }

  isAuthenticated() {
    return this.afAuth.authState
    .pipe(
      map( firebaseUser => {
        firebaseUser == null ? this.router.navigate(['/login']) : '';
        return firebaseUser != null;
      })
    );
  }

  getUser() {
    return { ...this.user };
  }

  showAlertError(title:string, err:any) {
    Swal.fire({
      title,
      text: err.message,
      icon: 'error',
    });
  }
}
