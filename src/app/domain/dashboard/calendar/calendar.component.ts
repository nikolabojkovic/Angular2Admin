import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { ModalService } from '../../shared/services/modal-service';

import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { CalendarService } from './calendar.service';

// replace with real model later
import { CalendarEvent } from '../../shared/models/calendar-event.model';

import { ActionMode } from '../../shared/enums/action-mode.enum';
import { DateHelper } from '../../shared/helpers/date.helper';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
})
export class CalendarComponent implements OnInit {

  private _calendar: Object;
  calendarConfiguration: any;
  events: CalendarEvent[] = [];
  isLoading = false;
  isSaving = false;
  isUpdating = false;
  isDeleting = false;

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
          result.data.forEach((element: CalendarEvent) => {
            const event = CalendarEvent.fromObject(element);
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
      result.data.forEach((element: CalendarEvent) => {
        const event = CalendarEvent.fromObject(element);
        // event.start = DateHelper.toDateOnly(event.start);
        // event.end = DateHelper.toDateOnly(event.end);
        this.events.push(event);
      });   

      jQuery(this._calendar).fullCalendar('removeEvents');
      jQuery(this._calendar).fullCalendar('addEventSource', this.events);
      this.isLoading = false; 
    });
  }

  private _onSelect(start, end): void {
    if (this._calendar !== null) {
      const calendarModal = this.modalService.open(CalendarModalComponent, { size: 'lg', backdrop: 'static' });
      calendarModal.componentInstance.setCalendarEvent(CalendarEvent.fromObject({ start, end }));
      calendarModal.result.then((newEvent) => {
        this.addEvent(start, end, newEvent);
      }, (reason) => {
        console.log(`Dismissed ${reason}`);
      });      
    }
  }

  private _onEventClick(event, jsEvent, view) {
    const calendarModal = this.modalService.open(CalendarModalComponent, {size: 'lg',
                                                 backdrop: 'static'});
    const modifiedEvent: CalendarEvent = this.events.find(x => x.id === event.id);
    calendarModal.componentInstance.setCalendarEvent(modifiedEvent);
    calendarModal.componentInstance.mode = ActionMode.Edit;
    calendarModal.result.then((result) => {
      if (result.delete) {
        this.deleteEvent(result.id);
        return;
      }

      this.updateEvent(event, result);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });     
  }

  private _onEventResize(event: any, jsEvent: any, view: any): any {
    const modifiedEvent = this.events.find(x => x.id === event.id);
    modifiedEvent.start = event.start;
    modifiedEvent.end = event.end;
    this.updateEvent(event, modifiedEvent);
  }

  private addEvent(start: any, end: any, newEvent: CalendarEvent) {
    this.isSaving = true;
    newEvent.id = Math.max(...this.events.map(x => x.id)) + 1;
    newEvent.start = start;
    newEvent.end = end;

    this._calendarService.saveEvent(newEvent).subscribe(() =>  { 
      // newEvent.start = DateHelper.toDateOnly(newEvent.start);
      // newEvent.end = DateHelper.toDateOnly(newEvent.end);
      jQuery(this._calendar).fullCalendar('renderEvent', newEvent, true);
      this.events.push(newEvent);
      this.isSaving = false;
    });          
    jQuery(this._calendar).fullCalendar('unselect');
  }

  private updateEvent(calendarEvent: any, modifiedEvent: CalendarEvent) {
    this.isUpdating = true;
    calendarEvent.title = modifiedEvent.title;
    this._calendarService.updateEvent(modifiedEvent).subscribe(() => {
      // calendarEvent.start = DateHelper.toDateOnly(calendarEvent.start);
      // calendarEvent.end = DateHelper.toDateOnly(calendarEvent.end);
      jQuery(this._calendar).fullCalendar('updateEvent', calendarEvent);
      this.events = this.events.filter(x => x.id !== calendarEvent.id);
      this.events.push(modifiedEvent);
      this.isUpdating = false;
    });
  }

  private deleteEvent(id: any) {
    this.isDeleting = true;
    this._calendarService.deleteEvent(id).subscribe(() => {
      jQuery(this._calendar).fullCalendar('removeEvents', id);
      this.events = this.events.filter(x => x.id !== id);
      this.isDeleting = false;
    });    
  }
}
