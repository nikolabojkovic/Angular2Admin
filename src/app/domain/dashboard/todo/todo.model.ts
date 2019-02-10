export class Todo {
    id: number;
    description: string;
    isCompleted: boolean;
    isArchived: boolean;

    constructor(
        id: number,
        description: string,
        isCompleted: boolean,
        isArchived: boolean
    ) {
        this.id = id;
        this.description = description;
        this.isCompleted = isCompleted;
        this.isArchived = isArchived;
    }

    static fromObject(data: any): Todo {
        return new Todo (data.id, data.description, data.isCompleted, data.isArchived);
    }
}
