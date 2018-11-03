export class Time {
    hour: number;
    minute: number;
    second: number;

    constructor(
        hour: number,
        minute: number,
        second: number,
    ) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    static fromObject(data: any): Time {
        return new Time(data.hour, data.minute, data.second);
    }
}
