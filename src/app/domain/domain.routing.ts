import { Routes, RouterModule } from '@angular/router';
import { DomainComponent } from './domain.component';
import { ModuleWithProviders } from '@angular/core';

import { DashboardDomainComponent } from './dashboard/dashboard-domain.component';
import { Dashboard } from 'app/pages/dashboard';

const routes: Routes = [
    {
        path: 'domain',
        component: DomainComponent,
        children: [
            { path: '', redirectTo: 'dashboard-domain', pathMatch: 'full' },
            { path: 'dashboard-domain', loadChildren: './dashboard/dashboard-domain.module#DashboardDomainModule' }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);