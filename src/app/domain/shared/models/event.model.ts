export class Event {
    id: number;
    title: String;
    description: String;

    constructor(id: number, title: String, description: String) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    static fromObject(data: any): Event {
        return new Event (data.id, data.title, data.description);
    }
}