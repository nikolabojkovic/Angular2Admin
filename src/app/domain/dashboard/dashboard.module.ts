import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { UiSwitchModule } from 'ng2-ui-switch'

import { DashboardComponent } from './dashboard.component';
import { PieChart } from './pieChart';
import { Calendar } from './calendar';
import { CalendarModalComponent } from './calendar/calendar-modal/calendar-modal.component';

import { CalendarService } from './calendar/calendar.service';
import { PieChartService } from './pieChart/pieChart.service';
import { ModalService } from '../shared/services/modal-service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    UiSwitchModule
  ],
  declarations: [
    Calendar,
    CalendarModalComponent,
    DashboardComponent,
    PieChart
  ],
  entryComponents: [
    CalendarModalComponent
  ],
  providers: [
    CalendarService,
    PieChartService,
    ModalService
  ]
})
export class DashboardModule {}
