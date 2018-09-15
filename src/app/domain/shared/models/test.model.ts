export class Test {
    id: number;
    firstName: String;

    constructor(id: number, firstName: String) {
        this.id = id;
        this.firstName = firstName;
    }

    static fromObject(data: any): Test {
        return new Test (data.id, data.firstName);
    }
}