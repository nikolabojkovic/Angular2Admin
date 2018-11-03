import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing }       from './domain.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { DomainComponent } from './domain.component';
import { PageNotFound } from './page-not-found/page-not-found.component';

import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
    imports: [
        CommonModule, 
        AppTranslationModule, 
        NgaModule, 
        DashboardModule,
        routing
    ],
    declarations: [
        DomainComponent,        
        PageNotFound
    ]
})
export class DomainModule {}
