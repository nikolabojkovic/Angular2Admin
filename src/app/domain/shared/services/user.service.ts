export class UserService {
    constructor() {}

    isLogedIn(): boolean {
        const token = localStorage.getItem("Authentication");
        return  token !== null && token !== undefined;
    }
}
