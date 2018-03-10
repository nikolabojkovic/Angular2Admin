import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './calendar-modal.component.html',
    styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

    title: string;

    constructor(private activeModal: NgbActiveModal) { }

    ngOnInit() { }

    closeModal(data: any) {
        this.activeModal.close(data);
    }

    dismiss(reason: any){
        this.activeModal.dismiss(reason);
    }
}