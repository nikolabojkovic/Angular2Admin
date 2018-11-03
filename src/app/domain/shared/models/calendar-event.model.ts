import { Reminder } from "./reminder.model";

export class CalendarEvent {
    id: number;
    color: any;
    title: string;
    description: string;
    start: Date;
    end: Date;
    reminder: Reminder;

    constructor(id: number, color: any, title: string, description: string,
                start: Date, end: Date, reminder: Reminder) {
        this.id = id;
        this.color = color;
        this.title = title;
        this.description = description;
        this.start = start;
        this.end = end; 
        this.reminder = reminder;
    }

    static fromObject(data: any): CalendarEvent {
        return new CalendarEvent (data.id, data.color, data.title, data.description,
                          data.start, data.end, data.reminder);
    }
}
