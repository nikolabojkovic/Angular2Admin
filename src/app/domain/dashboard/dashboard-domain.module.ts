import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { DashboardDomainComponent } from './dashboard-domain.component';
import { routing }       from './dashboard-domain.routing';

import { Calendar } from './calendar';

import { CalendarService } from './calendar/calendar.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    Calendar,
    DashboardDomainComponent
  ],
  providers: [
    CalendarService
  ]
})
export class DashboardDomainModule {}
