import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

// Servicios
import { AuthGuardService } from './services/auth/auth-guard.service';

// Componentes
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

const routes:Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '',
    loadChildren: './components/entryEgress/entry-egress.module#EntryEgressModule',
    canLoad: [ AuthGuardService ]
  },

  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}