import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DateHelper } from '../helpers/date.helper';

export class FakeWebApi implements InMemoryDbService {
    createDb() {
        const events = [
            { 
                id: 1, 
                color: '#00abff', 
                title: 'Long Event', 
                description: 'Long Event description.',
                start: DateHelper.formatDate(new Date(2018, 8, 7)),
                end: DateHelper.formatDate(new Date(2018, 8, 10))
            },
            { 
                id: 2, 
                color: '#00abff', 
                title: 'All Day Event', 
                description: 'All Day Event description.',
                start: DateHelper.formatDate(new Date(2018, 8, 7))
            },
            { 
                id: 3, 
                color: '#00abff',
                title: 'Dinner', 
                description: 'Event 3 description.',
                start: DateHelper.formatDate(new Date(2018, 8, 14)),
            }, 
        ];
        
        return { events };
    }
}
