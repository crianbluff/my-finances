import { Routes } from '@angular/router';
import { StatisticsComponent } from '../entryEgress/statistics/statistics.component';
import { EntryEgressComponent } from '../entryEgress/entry-egress.component';
import { DetailComponent } from '../entryEgress/detail/detail.component';

export const dashboardRoutes:Routes = [
  {
    path: 'dashboard',
    component: StatisticsComponent
  },

  {
    path: 'earnings-expenses',
    component: EntryEgressComponent
  },

  {
    path: 'detail',
    component: DetailComponent
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];