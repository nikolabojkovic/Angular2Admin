import {Component} from '@angular/core';
import * as jQuery from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import {CalendarService} from './calendar.service';

import { ActionMode } from '../../shared/action-mode.enum';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class Calendar {

  public calendarConfiguration:any;
  private _calendar:Object;

  constructor(
      private _calendarService:CalendarService,
      private modalService: NgbModal
    ) {
    this.calendarConfiguration = this._calendarService.getData();
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
    this.calendarConfiguration.eventClick = (event , jsEvent, view) => this._onEventClick(event, jsEvent, view);
  }

  public onCalendarReady(calendar):void {
    this._calendar = calendar;
  }

  // add new
  private _onSelect(start, end):void {

    if (this._calendar != null) {
      const calendarModal = this.modalService.open(CalendarModalComponent, {size: 'lg', backdrop: 'static'});
      calendarModal.result.then((result) => {
        let title = result;
        let eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          jQuery(this._calendar).fullCalendar('renderEvent', eventData, true);
        }
        jQuery(this._calendar).fullCalendar('unselect');
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });      
    }
  }

  // edit
  private _onEventClick(event, jsEvent, view) {
    const calendarModal = this.modalService.open(CalendarModalComponent, {size: 'lg',
                                                 backdrop: 'static'});
    calendarModal.componentInstance.title = event.title;
    calendarModal.componentInstance.mode = ActionMode.Edit
    calendarModal.componentInstance.start = event.start;
    calendarModal.componentInstance.end = event.end;
    calendarModal.result.then((result) => {
      event.title = result;
    jQuery(this._calendar).fullCalendar('updateEvent', event);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });     
  }
}
