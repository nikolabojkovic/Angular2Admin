import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DateHelper } from '../helpers/date.helper';
import { Reminder } from '../models/reminder.model';
import { Time } from '../models/time';
import { ReminderTimeOffset } from '../enums/reminder-time-offset.enum';

export class FakeWebApi implements InMemoryDbService {
    createDb() {
        const events = [
            { 
                id: 1, 
                color: '#00abff', 
                title: 'Long Event', 
                description: 'Long Event description.',
                start: DateHelper.formatDate(new Date(2018, 9, 7)),
                end: DateHelper.formatDate(new Date(2018, 9, 10)),
                reminder: Reminder.fromObject(
                    { 
                        id: 1, 
                        active: true, 
                        time: Time.fromObject(
                            {
                                hour: 4,
                                minute: 20,
                                second: 0
                            }),
                        timeOffset: ReminderTimeOffset.AtTimeOfEvent
                    })
                },
            { 
                id: 2, 
                color: '#00abff', 
                title: 'All Day Event', 
                description: 'All Day Event description.',
                start: DateHelper.formatDate(new Date(2018, 9, 7))
            },
            { 
                id: 3, 
                color: '#00abff',
                title: 'Dinner', 
                description: 'Event 3 description.',
                start: DateHelper.formatDate(new Date(2018, 9, 14)),
            }, 
        ];
        
        return { 'calendartestevents' : events };
    }
}
