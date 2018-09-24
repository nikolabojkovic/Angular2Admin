import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActionMode } from '../../../shared/enums/action-mode.enum';
import { CalendarEvent } from '../../../shared/models/calendar-event.model';
import { ReminderTimeOffset, 
         toString as reminderTimeOffsetToString,
         toArray as reminderTimeOffsetToArray } from '../../../shared/enums/reminder-time-offset.enum';

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './calendar-modal.component.html',
    styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

    calendarEvent: CalendarEvent;

    reminderTimeOffset: ReminderTimeOffset;
    mode: ActionMode;

    ActionMode: typeof ActionMode = ActionMode;
    ReminderTimeOffset: typeof ReminderTimeOffset = ReminderTimeOffset;

    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit() {
        if (this.calendarEvent === undefined) {
            this.calendarEvent = CalendarEvent.fromObject({ reminderTimeOffset: ReminderTimeOffset.AtTimeOfEvent });
        }

        console.log('test', this.calendarEvent);
        if (this.calendarEvent.isReminderEnabled) {
            jQuery('#reminderElement').slideDown(0);
        } else {
            jQuery('#reminderElement').slideUp(0);
        }
     }

    submit() {
        this.activeModal.close(this.calendarEvent);
    }

    delete() { 
        this.activeModal.close({ delete: true, id: this.calendarEvent.id });
    }

    dismiss(reason: any) {
        this.activeModal.dismiss(reason);
    }

    toggle(element: Element) {
        if (this.calendarEvent.isReminderEnabled) {
            jQuery(element).slideDown(400);
        } else {
            jQuery(element).slideUp(400);
        }
    }

    toString(type: ReminderTimeOffset): string {
        return reminderTimeOffsetToString(type);
    }

    timeOffsetToArray(): any {
        return reminderTimeOffsetToArray();
    }
}
