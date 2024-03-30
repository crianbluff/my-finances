import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Gráficas
import { ChartsModule } from 'ng2-charts';

// Modulos
import { ReactiveFormsModule } from '@angular/forms';

// Modulos personalizados
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

// Componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EntryEgressComponent } from './entry-egress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';

// Pipes
import { OrderEntryEgerssPipe } from './pipes/order-entry-egerss.pipe';
import { StoreModule } from '@ngrx/store';
import { entryEgressReducer } from './entry-egress.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    EntryEgressComponent,
    StatisticsComponent,
    DetailComponent,
    OrderEntryEgerssPipe
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('entryEgress', entryEgressReducer)
  ]
})
export class EntryEgressModule { }