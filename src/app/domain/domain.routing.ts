import { Routes, RouterModule } from '@angular/router';
import { DomainComponent } from './domain.component';
import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent } from './dashboard';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
    {
        path: 'backoffice',
        component: DomainComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { 
                path: 'dashboard',  
                component: DashboardComponent,
                canActivate: [AuthGuardService]
            }
        ]
    },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
