import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Login } from './domain/login/login.component';
import { Register } from './domain/register';

export const routes: Routes = [
  { 
    path: '', 
   redirectTo: 'backoffice', pathMatch: 'full'
  } ,
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  { 
    path: '**', 
    redirectTo: 'backoffice', pathMatch: 'full' // redirect to pageNotFound should be implemented here
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
