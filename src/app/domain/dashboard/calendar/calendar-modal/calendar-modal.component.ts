import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActionMode } from '../../../shared/enums/action-mode.enum';
import { Event } from '../../../shared/models/event.model';

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './calendar-modal.component.html',
    styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

    mode: ActionMode;
    event: Event;

    ActionMode: typeof ActionMode = ActionMode;

    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit() {
        if (this.event === undefined) {
            this.event = Event.fromObject({});
        }

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
        this.activeModal.close(this.event.id);
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
}
