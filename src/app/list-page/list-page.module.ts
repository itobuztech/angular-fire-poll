import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ListPageComponent } from './list-page/list-page.component';

const routes: Routes = [
  {
    path: '',
    component: ListPageComponent
  }
];

@NgModule({
  declarations: [ListPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ListPageModule { }
