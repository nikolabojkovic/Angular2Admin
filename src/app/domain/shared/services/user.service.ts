export class UserService {
    constructor() {}

    isLogedIn(): boolean {
        return localStorage.getItem("Authentication") !== null;
    }
}
