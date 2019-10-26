import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './domain/login/login.component';
import { Register } from './domain/register';
import { PageNotFound } from './domain/page-not-found/index';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'backoffice', pathMatch: 'full'
  } ,
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: Register
  },
  { 
    path: '**',
    component: PageNotFound 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}
