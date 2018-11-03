import { ReminderTimeOffset } from "../enums/reminder-time-offset.enum";
import { Time } from "./time";

export class Reminder {
    id: number;
    active: boolean;
    time: Date;
    timeOffset: ReminderTimeOffset;

    constructor(
            id: number,
            active: boolean,
            time: Date,
            timeOffset: ReminderTimeOffset) {
        this.id = id;
        this.active = active;
        this.time = time ? new Date(time) : undefined;
        this.timeOffset = timeOffset;
    }

    static fromObject(data: any): Reminder {
        return new Reminder (data.id, data.active, data.time, data.timeOffset);
    }

    static default(): Reminder {
        return new Reminder(undefined, false, new Date(), ReminderTimeOffset.AtTimeOfEvent);
    }
}
