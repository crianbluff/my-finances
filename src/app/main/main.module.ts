import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Firebase
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// Modules
import { SharedModule } from '@shared/shared.module';

// Components
import { MainComponent } from 'src/app/main/main.component';
import { NavbarComponent } from 'src/app/main/menu/navbar/navbar.component';
import { SidebarComponent } from 'src/app/main/menu/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/main/footer/footer.component';

// Routes
const dashboardRoutes:Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) },
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
    
      {
        path: 'dashboard',
        loadChildren: '../components/dashboard/dashboard.module#DashboardModule'
      },
    
      {
        path: 'earnings-expenses',
        loadChildren: '../components/add-earnings-expenses/add-earnings-expenses.module#AddEarningsExpensesModule'
      },
    
      {
        path: 'detail',
        loadChildren: '../components/detail/detail.module#DetailModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutes)
  ],

  declarations: [
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class MainModule { }