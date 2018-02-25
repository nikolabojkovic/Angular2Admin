import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/dashboard' },
  {
    path: 'login',
    loadChildren: 'app/domain/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/domain/register/register.module#RegisterModule'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
