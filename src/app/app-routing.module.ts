import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './services/user-guard.guard';

const routes: Routes = [
  {
    path: 'list', loadChildren: './list-page/list-page.module#ListPageModule',
    canActivate: [UserGuard]
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
    path: 'welcome', loadChildren: './welcome-page/welcome-page.module#WelcomePageModule',
  },
  { path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  // { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
