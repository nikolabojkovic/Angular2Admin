import { ReminderTimeOffset } from "../enums/reminder-time-offset.enum";

export class CalendarEvent {
    id: number;
    color: any;
    title: string;
    description: string;
    start: Date;
    end: Date;
    reminderEnabled: boolean;
    reminderTime: Date;
    reminderTimeOffset: ReminderTimeOffset;

    constructor(id: number, color: any, title: string, description: string,
                start: Date, end: Date, reminderEnabled: boolean,
                reminderTime: Date, reminderTimeOffset: ReminderTimeOffset) {
        this.id = id;
        this.color = color;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end;
        this.reminderEnabled = reminderEnabled;
        this.reminderTime = reminderTime;
        this.reminderTimeOffset = reminderTimeOffset;
    }

    static fromObject(data: any): CalendarEvent {
        return new CalendarEvent (data.id, data.color, data.title, data.description,
                          data.start, data.end, data.reminderEnabled,
                          data.reminderTime, data.reminderTimeOffset);
    }
}
