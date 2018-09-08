import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActionMode } from '../../../shared/action-mode.enum'

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './calendar-modal.component.html',
    styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

    mode: ActionMode;

    title: string;
    description: string;
    start: Date;
    end: Date;
    reminderEnabled: boolean;

    ActionMode: typeof ActionMode = ActionMode;

    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit() {
        if (this.reminderEnabled) {
            jQuery("#reminderElement").slideDown(400);
        } else {
            jQuery("#reminderElement").slideUp(400);
        }
     }

    submit(data: any) {
        this.activeModal.close(data);
    }

    delete() { 

    }

    dismiss(reason: any){
        this.activeModal.dismiss(reason);
    }

    toggle(element: any) {
        if (this.reminderEnabled) {
            jQuery(element).slideDown(400);
        } else {
            jQuery(element).slideUp(400);
        }
    }
}