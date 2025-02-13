// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

// Routes
import { RouterModule, Routes } from '@angular/router';

// Custom Modules
import { SharedModule } from '@shared/shared.module';

// Reducers
import { entryEgressReducer } from '@earnings-expenses/reducers/earnings-expenses.reducer';

// Components
import { DetailComponent } from '@detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('entryEgress', entryEgressReducer)
  ],

  declarations: [
    DetailComponent
  ]
})
export class DetailModule { }