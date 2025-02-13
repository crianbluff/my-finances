import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { AlertsService } from '@shared/services/alerts/alerts.service';
import { EarningsExpensesService } from '@sh-services/earnings-expenses/earnings-expenses.service';

// Pipes
import { OrderByTypePipe } from '@sh-pipes/order-by-type.pipe';

// Components
import { NotFoundComponent } from '@sh-components/404/not-found.component';
import { ShBtnComponent } from '@sh-components/sh-btn/sh-btn.component';
import { ShCardComponent } from '@sh-components/sh-card/sh-card.component';
import { ShLoadingComponent } from '@sh-components/sh-loading/sh-loading.component';
import { ShTableComponent } from '@sh-components/sh-table/sh-table.component';
import { ShTitleComponent } from '@sh-components/sh-title/sh-title.component';
import { ShNoResultsComponent } from '@sh-components/sh-no-results/sh-no-results.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],

  declarations: [
    OrderByTypePipe,
    NotFoundComponent,
    ShBtnComponent,
    ShCardComponent,
    ShLoadingComponent,
    ShNoResultsComponent,
    ShTableComponent,
    ShTitleComponent
  ],

  exports: [
    OrderByTypePipe,
    NotFoundComponent,
    ShBtnComponent,
    ShCardComponent,
    ShLoadingComponent,
    ShNoResultsComponent,
    ShTableComponent,
    ShTitleComponent
  ],

  providers: [
    AlertsService,
    EarningsExpensesService
  ]
})
export class SharedModule { }