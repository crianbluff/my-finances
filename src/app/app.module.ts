import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Environments
import { environment } from 'src/environments/environment';

// Modulos
import { AppRoutingModule } from './app-routing.module';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule  } from '@angular/fire/firestore';

// Modulos personalizados
import { AuthModule } from './components/auth/auth.module';

// Componentes
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],

  providers: [],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }