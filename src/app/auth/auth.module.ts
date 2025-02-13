import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Modules
import { SharedModule } from '@app/shared/shared.module';

// Components
import { LoginComponent } from '@auth/login/login.component';
import { RegisterComponent } from '@auth/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['dashboard']) }
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['dashboard']) }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes)
  ],

  declarations: [
    LoginComponent,
    RegisterComponent
  ],
})
export class AuthModule {}