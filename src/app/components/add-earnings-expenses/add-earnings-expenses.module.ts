import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Forms
import { ReactiveFormsModule } from '@angular/forms';

// Custom Modules
import { SharedModule } from '@shared/shared.module';

// Components
import { AddEarningsExpensesComponent } from '@earnings-expenses/add-earnings-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: AddEarningsExpensesComponent
  }
];

@NgModule({
  declarations: [
    AddEarningsExpensesComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AddEarningsExpensesModule { }