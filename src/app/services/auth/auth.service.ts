import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable, Subscription, pipe } from 'rxjs';
import { Store } from '@ngrx/store';

// Actions
import { ActivateLoadingAction, DisabledLoadingAction } from '@earnings-expenses/actions/user-interface.action';
import { SetUserAction, UnsetUserAction } from '@auth/auth.action';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

// Reducers
import { AppState } from '@app/app.reducer';

// Services
import { AlertsService } from '@sh-services/alerts/alerts.service';

// Models
import { User } from '@auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription:Subscription = new Subscription();
  private user:User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private angularFireDb: AngularFirestore,
    private store: Store<AppState>,
    public alertsService: AlertsService,
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (firebaseUser:firebase.User) => {
      if ( firebaseUser ) {
        this.userSubscription = this.angularFireDb.doc(`${firebaseUser.uid}/user`).valueChanges().subscribe( (userFirebase:User) => {
          const newUser = new User(userFirebase);
          this.store.dispatch(new SetUserAction(newUser));
          this.user = newUser;
        });
      } else {
          this.user = null;
          this.userSubscription.unsubscribe();
        }
    });
  }

  createUser(name:string, email:string, password:string) {
    this.store.dispatch(new ActivateLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then( resp => {
      const user:User = {
        uid: resp.user.uid,
        email: resp.user.email,
        name
      };

      this.angularFireDb.doc(`${user.uid}/user`)
      .set(user).then( () => {
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
      this.alertsService.showAlertError('Error when the user was created!', err);
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
      this.alertsService.showAlertError('Error trying to login!', err);
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
    this.store.dispatch( new UnsetUserAction() );
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(u => !!u));
  }

  getUser() {
    return { ...this.user };
  }
}
