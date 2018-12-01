import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CreatePageComponent } from './create-page/create-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreatePageComponent
  }
];

@NgModule({
  declarations: [CreatePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: []
})
export class CreatePageModule { }
