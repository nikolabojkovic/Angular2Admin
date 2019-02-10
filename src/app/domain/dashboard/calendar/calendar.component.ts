import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { ModalService } from '../../shared/services/modal-service';

import { CalendarModalComponent } from './calendar-modal/calendar-modal.component';
import { CalendarService } from './calendar.service';

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
  private userErrorMessage = "Ooops, something went wrong";
  calendarConfiguration: any;
  events: CalendarEvent[] = [];
  isLoading = false;
  isSaving = false;
  isUpdating = false;
  isDeleting = false;
  error: string;

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
  }


  fatchEvents() {
    this.isLoading = true;
    this.events = [];
    this._calendarService.getEvents().subscribe(result => {
      result.data.forEach((element: CalendarEvent) => {
        const event = CalendarEvent.fromObject(element);
        event.start = DateHelper.toDateOnly(new Date(event.start));
        event.end = DateHelper.toDateOnly(new Date(event.end));
        this.events.push(event);
      });   

      jQuery(this._calendar).fullCalendar('removeEvents');
      jQuery(this._calendar).fullCalendar('addEventSource', this.events);
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  addEvent(start: any, end: any, newEvent: CalendarEvent) {
    this.isSaving = true;
    // with paging (per month) this id assigment have to change
    newEvent.id = Math.max(...this.events.map(x => x.id)) + 1;
    newEvent.start = DateHelper.toUTCDate(newEvent.start);
    newEvent.end = DateHelper.toUTCDate(newEvent.end);
    this._calendarService.saveEvent(newEvent).subscribe(() =>  { 
      this.isSaving = false;
      this.fatchEvents();
    },
    error => this.handleError(error));          
    jQuery(this._calendar).fullCalendar('unselect');
  }

  updateEvent(calendarEvent: any, modifiedEvent: CalendarEvent) {
    this.isUpdating = true;
    modifiedEvent.start = DateHelper.toUTCDate(modifiedEvent.start);
    modifiedEvent.end = DateHelper.toUTCDate(modifiedEvent.end);
    this._calendarService.updateEvent(modifiedEvent).subscribe(() => {
      this.isUpdating = false;
      this.fatchEvents();
    },
    error => this.handleError(error));
  }

  deleteEvent(id: any) {
    this.isDeleting = true;
    this._calendarService.deleteEvent(id).subscribe(() => {
      this.isDeleting = false;
      this.fatchEvents();
    },
    error => this.handleError(error));    
  }

  private _onSelect(start, end): void {
    if (this._calendar !== null) {
      const calendarModal = this.modalService.open(CalendarModalComponent, { size: 'lg', backdrop: 'static' });
      calendarModal.componentInstance.setCalendarEvent(CalendarEvent.fromObject({ 
        start: new Date(start),
        end: new Date(end) 
      }));
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

  private handleError(error: Error) {
    console.log(error);
    this.error = this.userErrorMessage;
    this.isSaving = false;
    this.isLoading = false;
    this.isUpdating = false;
    this.isDeleting = false;
  }
}
