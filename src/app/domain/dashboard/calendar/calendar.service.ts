import { Injectable } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';
import { HttpService } from '../../shared/services/http.service';
import { Observable } from 'rxjs';

import { Test } from '../../shared/models/test.model';

@Injectable()
export class CalendarService {

  constructor(
    private _baConfig: BaThemeConfigProvider,
    private httpService: HttpService) {
  }

  getEvents(): Observable<any> {
    return this.httpService.get('events')
                           .map((res: Response) => res.json());
  }

  saveEvent(event: Event): Observable<any> {
    return this.httpService.post('events', event);
  }

  updateEvent(event: Event): Observable<any> {
    return this.httpService.put('events', event);
  }

  deleteEvent(id: any): Observable<any> {
    return this.httpService.delete(`events/${id}`);
  }

  getData(events: any) {

    const dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      header: {
        left: 'prevYear,prev today next,nextYear',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2016-03-08',
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: events
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
