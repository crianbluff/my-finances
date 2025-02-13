// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

// Routes
import { RouterModule, Routes } from '@angular/router';

// Charts
import { ChartsModule, ThemeService } from 'ng2-charts';

// Modules
import { SharedModule } from '@shared/shared.module';

// Reducers
import { entryEgressReducer } from '@earnings-expenses/reducers/earnings-expenses.reducer';

// Components
import { DashboardComponent } from '@dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('entryEgress', entryEgressReducer)
  ],

  declarations: [
    DashboardComponent
  ],

  providers: [
    ThemeService
  ]
})
export class DashboardModule { }