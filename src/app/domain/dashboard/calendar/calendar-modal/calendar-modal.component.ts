import { Component, OnInit, Query } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActionMode } from '../../../shared/enums/action-mode.enum';
import { CalendarEvent } from '../../../shared/models/calendar-event.model';
import { ReminderTimeOffset, 
         toString as reminderTimeOffsetToString,
         toArray as reminderTimeOffsetToArray } from '../../../shared/enums/reminder-time-offset.enum';
import { Reminder } from '../../../shared/models/reminder.model';
import { Time } from '../../../shared/models/time';

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './calendar-modal.component.html',
    styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

    calendarEvent: CalendarEvent;
    reminder: Reminder;

    startDateModel: any;
    endDateModel: any;
    timeModel: Time;

    reminderTimeOffset: ReminderTimeOffset;
    mode: ActionMode;

    ActionMode: typeof ActionMode = ActionMode;
    ReminderTimeOffset: typeof ReminderTimeOffset = ReminderTimeOffset;

    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit() {
        if (this.calendarEvent === undefined) {
            this.calendarEvent = CalendarEvent.fromObject({ });
            this.reminder = Reminder.default();
        } else {
            this.calendarEvent = CalendarEvent.fromObject(this.calendarEvent);
            if (this.calendarEvent.reminder === undefined || this.calendarEvent.reminder === null) {
                this.reminder = Reminder.default();
                this.timeModel = Time.fromObject({});
            } else {
                this.reminder = Reminder.fromObject(this.calendarEvent.reminder);
                this.timeModel = Time.fromObject(
                    { 
                        hour: new Date(this.reminder.time).getHours(),
                        minute: new Date(this.reminder.time).getMinutes(),
                        second: new Date(this.reminder.time).getSeconds()
                    });
            }
        }

        this.toggle(document.querySelector('#reminderElement'), 0);
     }

    setCalendarEvent(calendareEvent) {
        this.calendarEvent = calendareEvent;
        this.startDateModel = { 
            year: this.calendarEvent.start.getFullYear, 
            month: this.calendarEvent.start.getMonth, 
            day: this.calendarEvent.start.getDate 
        };
    
        this.endDateModel = { 
            year: this.calendarEvent.end.getFullYear, 
            month: this.calendarEvent.end.getMonth, 
            day: this.calendarEvent.end.getDate
        };
    }

    submit() {
        if (this.reminder.active) {
            this.reminder.time = new Date(this.calendarEvent.start);
            this.reminder.time.setHours(this.timeModel.hour);
            this.reminder.time.setMinutes(this.timeModel.minute);
            this.reminder.time.setSeconds(this.timeModel.second);
            this.calendarEvent.reminder = this.reminder;
        }

        // exists but disabled - save state
        if (this.calendarEvent.reminder && this.calendarEvent.reminder.active !== this.reminder.active) {
            this.calendarEvent.reminder.active = this.reminder.active;
        }

        this.activeModal.close(this.calendarEvent);
    }

    delete() { 
        this.activeModal.close({ delete: true, id: this.calendarEvent.id });
    }

    dismiss(reason: any) {
        this.activeModal.dismiss(reason);
    }

    toggle(element: Element, duration: number) {
        if (this.reminder.active) {
            jQuery(element).slideDown(duration);
        } else {
            jQuery(element).slideUp(duration);
        }
    }

    toString(type: ReminderTimeOffset): string {
        return reminderTimeOffsetToString(type);
    }

    timeOffsetToArray(): any {
        return reminderTimeOffsetToArray();
    }
}
