import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';
import { HttpService } from '../../shared/services/http.service';
import { Observable } from 'rxjs';

import { DateHelper } from '../../shared/helpers/date.helper';
import { CalendarEvent } from '../../shared/models/calendar-event.model';

@Injectable()
export class CalendarService {

//  private calendarEventsEndPoint = 'calendartestevents';
  private calendarEventsEndPoint = 'calendar/events';

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private httpService: HttpService) {
  }

  getEvents(): Observable<any> {
    return this.httpService.get(this.calendarEventsEndPoint)
                           .map((res: Response) => res.json());
  }

  saveEvent(event: CalendarEvent): Observable<any> {
    return this.httpService.post(this.calendarEventsEndPoint, event);
  }

  updateEvent(event: CalendarEvent): Observable<any> {
    return this.httpService.put(`${this.calendarEventsEndPoint}/${event.id}`, event);
  }

  deleteEvent(id: any): Observable<any> {
    return this.httpService.delete(`${this.calendarEventsEndPoint}/${id}`);
  }

  getMetaData() {

    const dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      header: {
        left: 'prevYear,prev today next,nextYear',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: DateHelper.formatDate(new Date()),
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true
      // events: events
      // [
        // {
        //   title: 'All Day Event',
        //   start: '2016-03-01',
        //   color: dashboardColors.silverTree
        // },
        // {
        //   title: 'Long Event',
        //   start: '2016-03-07',
        //   end: '2016-03-10',
        //   color: dashboardColors.blueStone
        // },
        // {
        //   title: 'Dinner',
        //   start: '2016-03-14T20:00:00',
        //   color: dashboardColors.surfieGreen
        // },
        // {
        //   title: 'Birthday Party',
        //   start: '2016-04-01T07:00:00',
        //   color: dashboardColors.gossip
        // }
      // ]
    };
  }
}
