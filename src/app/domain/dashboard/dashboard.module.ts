import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule, ReactiveFormsModule }          from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule }            from '../../theme/nga.module';
import { UiSwitchModule }       from 'ng2-ui-switch';
import { NgbTimepickerModule, NgbDatepickerModule }  from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent }     from './dashboard.component';
import { PieChart }               from './pieChart';
import { CalendarComponent }      from './calendar';
import { CalendarModalComponent } from './calendar/calendar-modal/calendar-modal.component';
import { Todo }                   from './todo';

import { CalendarService } from './calendar/calendar.service';
import { PieChartService } from './pieChart/pieChart.service';
import { ModalService }    from '../shared/services/modal-service';
import { TodoService }     from './todo/todo.service';
import { HttpService }     from '../shared/services/http.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    UiSwitchModule,
    NgbTimepickerModule,
    NgbDatepickerModule,
    ReactiveFormsModule
  ],
  declarations: [
    CalendarComponent,
    CalendarModalComponent,
    DashboardComponent,
    PieChart,
    Todo
  ],
  entryComponents: [
    CalendarModalComponent
  ],
  providers: [
    CalendarService,
    PieChartService,
    ModalService,
    TodoService,
    HttpService
  ]
})
export class DashboardModule {}
