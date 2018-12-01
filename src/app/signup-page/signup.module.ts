import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignupPageComponent
  }
];

@NgModule({
  declarations: [SignupPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class SignupModule { }
