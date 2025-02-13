import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { SharedModule } from '@shared/shared.module';

// Components
import { PageNotFoundComponent } from '@app/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '404',
    pathMatch: 'full',
    redirectTo: ''
  },

  {
    path: '',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PageNotFoundModule { }