export enum ReminderTimeOffset {
    AtTimeOfEvent = 1,
    FiveMinBefore = 2,
    TenMinBefore = 3,
    FifteenMinBefore = 4,
    ThirtyMinBefore = 5,
    OneHoureBefore = 6
}

export function toString(type: ReminderTimeOffset): string {
    switch (type) {
        case ReminderTimeOffset.AtTimeOfEvent: 
            return 'At time of event';
        case ReminderTimeOffset.FiveMinBefore: 
            return 'Five minutes before';
        case ReminderTimeOffset.TenMinBefore: 
            return 'Ten minutes before';
        case ReminderTimeOffset.FifteenMinBefore: 
            return 'Fifteen minutes before';
        case ReminderTimeOffset.ThirtyMinBefore: 
            return 'Thirty minutes before';
        case ReminderTimeOffset.OneHoureBefore: 
            return 'One houre before';
    }
}

export function toArray(): any {
    return [
        ReminderTimeOffset.AtTimeOfEvent,
        ReminderTimeOffset.FiveMinBefore,
        ReminderTimeOffset.TenMinBefore,
        ReminderTimeOffset.FifteenMinBefore,
        ReminderTimeOffset.ThirtyMinBefore,
        ReminderTimeOffset.OneHoureBefore
    ];
}
