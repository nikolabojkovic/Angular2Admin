import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { ModalService } from '../../shared/services/modal-service';

import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { CalendarService } from './calendar.service';

// replace with real model later
import { Test } from '../../shared/models/test.model';
import { Event } from '../../shared/models/event.model';

import { ActionMode } from '../../shared/enums/action-mode.enum';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class CalendarComponent implements OnInit {

  private _calendar: Object;
  calendarConfiguration: any;
  events: Event[] = [];
  isLoading = false;

  constructor(
      private _calendarService: CalendarService,
      private modalService: ModalService
    ) { }

  ngOnInit(): void {      
    this.calendarConfiguration = this._calendarService.getMetaData();
    this.calendarConfiguration.select = (start, end) => this._onSelect(start, end);
    this.calendarConfiguration.eventClick = (event , jsEvent, view) => this._onEventClick(event, jsEvent, view);
    this.calendarConfiguration.eventResize = (event , jsEvent, view) => this._onEventResize(event, jsEvent, view);     
  }

  onCalendarReady(calendar): void {
    this._calendar = calendar;
    this.fatchEvents();

    const ctrl = this;
    // does not catch this line for some reason
    jQuery(this._calendar).fullCalendar({
      events: function(start, end, timezone, callback) {
        ctrl._calendarService.getEvents().subscribe(result => {
          result.data.forEach((element: Test) => {
            const event = Event.fromObject(element);
            ctrl.events.push(event);
          });
          callback(ctrl.events);
        });
      }
    });
  }

  fatchEvents() {
    this.isLoading = true;
    this.events = [];
    this._calendarService.getEvents().subscribe(result => {
      result.data.forEach((element: Test) => {
        const event = Event.fromObject(element);
        this.events.push(event);
      });   

      jQuery(this._calendar).fullCalendar('removeEvents');
      jQuery(this._calendar).fullCalendar('addEventSource', this.events);
      this.isLoading = false; 
    });
  }

  _onEventResize(event: any, jsEvent: any, view: any): any {
    const changedEvent = this.events.find(x => x.id === event.id);
    changedEvent.start = event.start;
    changedEvent.end = event.end;
  }

  // add new
  private _onSelect(start, end): void {
    if (this._calendar !== null) {
      const calendarModal = this.modalService.open(CalendarModalComponent, { size: 'lg', backdrop: 'static' });
      calendarModal.result.then((newEvent) => {
        if (newEvent.title) {
          newEvent.start = start;
          newEvent.end = end;
          jQuery(this._calendar).fullCalendar('renderEvent', newEvent, true);
          this.events.push(newEvent);
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
    calendarModal.componentInstance.event = this.events.find(x => x.id === event.id);
    calendarModal.componentInstance.mode = ActionMode.Edit;
    calendarModal.result.then((result) => {
      if ( result.delete) {
        jQuery(this._calendar).fullCalendar('removeEvents', result.id);
        return;
      }
      event.title = result.title;
      jQuery(this._calendar).fullCalendar('updateEvent', event);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });     
  }
}
