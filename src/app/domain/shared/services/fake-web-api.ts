import { InMemoryDbService } from 'angular-in-memory-web-api';

export class FakeWebApi implements InMemoryDbService {
    createDb() {
        const events = [
            { id: 1, title: 'Event 1', description: 'Event 1 description.' },
            { id: 2, title: 'Event 2', description: 'Event 2 description.' },
            { id: 3, title: 'Event 3', description: 'Event 3 description.' }, 
        ];
        
        return {events};
    }
}