import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list', loadChildren: './list-page/list-page.module#ListPageModule',
  },
  {
    path: 'create', loadChildren: './create-page/create-page.module#CreatePageModule',
  },
  {
    path: 'edit/:id', loadChildren: './create-page/create-page.module#CreatePageModule',
  },
  {
    path: 'view/:id', loadChildren: './poll-view/poll-view.module#PollViewModule',
  },
  {
    path: 'signup', loadChildren: './signup-page/signup.module#SignupModule',
  },
  { path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  // { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
