import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing }       from './domain.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { DomainComponent } from './domain.component';

import { DashboardDomainModule } from './dashboard/dashboard-domain.module'

@NgModule({
    imports: [
        CommonModule, 
        AppTranslationModule, 
        NgaModule, 
        DashboardDomainModule,
        routing
    ],
    declarations: [DomainComponent]
})
export class DomainModule {}