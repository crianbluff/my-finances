import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Routes
import { dashboardRoutes } from './dashboard.routes';

// Servicios
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

// Componentes
import { DashboardComponent } from './dashboard.component';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [ AuthGuardService ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(childRoutes)
  ],

  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }