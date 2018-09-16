import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActionMode } from '../../../shared/enums/action-mode.enum';
import { Event } from '../../../shared/models/event.model';
import { ReminderTimeOffset, 
         toString as reminderTimeOffsetToString,
         toArray as reminderTimeOffsetToArray } from '../../../shared/enums/reminder-time-offset.enum';

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './calendar-modal.component.html',
    styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

    event: Event;

    reminderTimeOffset: ReminderTimeOffset;
    mode: ActionMode;

    ActionMode: typeof ActionMode = ActionMode;
    ReminderTimeOffset: typeof ReminderTimeOffset = ReminderTimeOffset;

    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit() {
        if (this.event === undefined) {
            this.event = Event.fromObject({ reminderTimeOffset: ReminderTimeOffset.AtTimeOfEvent });
        }

        console.log('test', this.event);
        if (this.event.reminderEnabled) {
            jQuery('#reminderElement').slideDown(0);
        } else {
            jQuery('#reminderElement').slideUp(0);
        }
     }

    submit() {
        this.activeModal.close(this.event);
    }

    delete() { 
        this.activeModal.close({ delete: true, id: this.event.id });
    }

    dismiss(reason: any) {
        this.activeModal.dismiss(reason);
    }

    toggle(element: Element) {
        if (this.event.reminderEnabled) {
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
