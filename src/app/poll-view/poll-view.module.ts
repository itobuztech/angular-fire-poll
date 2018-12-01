import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PollViewComponent } from './poll-view/poll-view.component';

const routes: Routes = [
  {
    path: '',
    component: PollViewComponent
  }
];

@NgModule({
  declarations: [PollViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class PollViewModule { }
