import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routes
import { RouterModule, Routes } from '@angular/router';

// Environments
import { environment } from '@env/environment';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from '@app/app.reducer';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// Modules
import { SharedModule } from '@shared/shared.module';
import { AuthModule } from '@auth/auth.module';

// Components
import { CoreComponent } from '@core/core.component';

const routes:Routes = [
  {
    path: '',
    loadChildren: '../main/main.module#MainModule'
  },

  {
    path: '**',
    redirectTo: '404'
  },

  {
    path: '404',
    loadChildren: '../components/page-not-found/page-not-found.module#PageNotFoundModule'
  },

  {
    path: 'login',
    loadChildren: '../auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],

  declarations: [CoreComponent],
  exports: [CoreComponent],
  
  providers: [
    AngularFireAuthGuard
  ]
})
export class CoreModule { }