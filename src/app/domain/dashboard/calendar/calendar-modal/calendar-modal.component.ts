import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActionMode } from '../../../shared/enums/action-mode.enum';
import { CalendarEvent } from '../../../shared/models/calendar-event.model';
import { ReminderTimeOffset, 
         toString as reminderTimeOffsetToString,
         toArray as reminderTimeOffsetToArray } from '../../../shared/enums/reminder-time-offset.enum';
import { Reminder } from '../../../shared/models/reminder.model';
import { Time } from '../../../shared/models/time';
import { FormControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateHelper } from 'app/domain/shared/helpers/date.helper';

@Component({
    selector: 'app-calendar-modal',
    templateUrl: './calendar-modal.component.html',
    styleUrls: ['./calendar-modal.component.scss']
})
export class CalendarModalComponent implements OnInit {

    calendarEvent: CalendarEvent;
    reminder: Reminder;
    error: any = {};

    startDateModel: any;
    endDateModel: any;
    reminderTimeModel: Time;

    isTitleTouched: boolean;
    isReminderTimeValid: boolean;

    form: FormGroup;
    mode: ActionMode;    

    ActionMode: typeof ActionMode = ActionMode;
    ReminderTimeOffset: typeof ReminderTimeOffset = ReminderTimeOffset;

    constructor(private activeModal: NgbActiveModal, private fb: FormBuilder) { }

    ngOnInit() {
        this.initModels();        
        this.createForm();
        this.setForm();
        this.toggle(document.querySelector('#reminderElement'), 0);
        document.querySelector('[aria-label="Hours"]').classList.add('fadable-border-color');
        document.querySelector('[aria-label="Minutes"]').classList.add('fadable-border-color');
    }

    initModels(): void {
        if (this.calendarEvent === undefined) {
            // if 'Add' set to default values
            this.calendarEvent = CalendarEvent.fromObject({ });
            this.reminder = Reminder.default();
            this.reminderTimeModel = Time.fromObject({
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds()
            });
        } else {
            // if 'Edit' set from recieved object
            this.calendarEvent = CalendarEvent.fromObject(this.calendarEvent);
            if (this.IsNotSet(this.calendarEvent.reminder)) {
                this.reminder = Reminder.default();
                this.reminderTimeModel = Time.fromObject({
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes(),
                    second: new Date().getSeconds()
                });
            } else {
                this.reminder = Reminder.fromObject(this.calendarEvent.reminder);
                this.reminderTimeModel = Time.fromObject(
                    { 
                        hour: this.reminder.time.getHours(),
                        minute: this.reminder.time.getMinutes(),
                        second: this.reminder.time.getSeconds()
                    });
            }
        }
    }

    createForm() {
        const ctrlFrom = this.form;
        this.form = this.fb.group({
            title: new FormControl('', Validators.required),
            description: new FormControl(''),
            reminder: this.fb.group({
                isActive: new FormControl(false),
                eventTime: new FormControl('', null),
                timeOffset: new FormControl('')
            })           
        }, {
            validator: this.reminderTimeValidator.bind(this)
        });
    }

    reminderTimeValidator(group: FormGroup) {
        const value = group.value.reminder.eventTime;

        if (!group.value.reminder.isActive) {
            this.isReminderTimeValid = true;
            return null;
        }
    
        if (!value) {
          this.error.invalidTime = 'Reminder time is required';
          this.isReminderTimeValid = false;
          document.querySelector('[aria-label="Hours"]').classList.add('error');
          document.querySelector('[aria-label="Minutes"]').classList.add('error');
          return { invalidTime: true };
        }
    
        document.querySelector('[aria-label="Hours"]').classList.remove('error');
        document.querySelector('[aria-label="Minutes"]').classList.remove('error');
        this.isReminderTimeValid = true;
        return null;
      }

    setForm(): void {
        if (!this.calendarEvent) {
            return;
        }

        this.form.setValue({
            title: this.calendarEvent.title ? this.calendarEvent.title : '',
            description: this.calendarEvent.description ? this.calendarEvent.description : '',
            reminder: {
                isActive: this.calendarEvent.reminder ? this.calendarEvent.reminder.active : false,
                eventTime: this.reminderTimeModel,
                timeOffset: this.reminder.timeOffset
            }
        });
    }

    getForm(): void {
        const event = this.form.value;
        this.calendarEvent.title = event.title;
        this.calendarEvent.description = event.description;

        this.reminder.active = event.reminder.isActive;   
        if (this.reminder.active) {
            this.reminderTimeModel = Time.fromObject(event.reminder.eventTime);
            this.reminder.time = new Date(this.calendarEvent.start);
            this.reminder.time.setHours(this.reminderTimeModel.hour);
            this.reminder.time.setMinutes(this.reminderTimeModel.minute);
            this.reminder.time.setSeconds(this.reminderTimeModel.second);
            this.reminder.timeOffset = event.reminder.timeOffset;
        }

        this.calendarEvent.reminder = this.reminder;
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
        this.getForm();

        // convert dateTime to utc dateTime
        if (this.calendarEvent.reminder.time) {
            this.calendarEvent.reminder.time = DateHelper.toUTCDate(this.calendarEvent.reminder.time);
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
        if (this.form.value.reminder.isActive) {
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

    // on change 
    onTitleChange(title: any): void {
        if (title === "") {
            this.error.title = "Title is required";
            return;
        }
    }

    onTitleKeyup() {
        this.isTitleTouched = true;
    }

    // helper methods
    IsNotSet(value: any): Boolean {
        return value === undefined || value === null;
    }
}
