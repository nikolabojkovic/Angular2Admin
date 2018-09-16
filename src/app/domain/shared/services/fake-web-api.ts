import { InMemoryDbService } from 'angular-in-memory-web-api';

export class FakeWebApi implements InMemoryDbService {
    createDb() {
        const events = [
            { 
                id: 1, 
                color: '#00abff', 
                title: 'Long Event', 
                description: 'Long Event description.',
                start: '2016-03-07',
                end: '2016-03-10',
            },
            { 
                id: 2, 
                color: '#00abff', 
                title: 'All Day Event', 
                description: 'All Day Event description.',
                start: '2016-03-07'
            },
            { 
                id: 3, 
                color: '#00abff',
                title: 'Dinner', 
                description: 'Event 3 description.',
                start: '2016-03-14T20:00:00',
            }, 
        ];
        
        return { events };
    }
}
