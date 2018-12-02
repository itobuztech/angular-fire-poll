import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DisqusModule } from 'ngx-disqus';

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
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DisqusModule
  ]
})
export class PollViewModule { }
