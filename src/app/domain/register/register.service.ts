import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/services/http.service';

@Injectable()
export class RegisterService {

    private registerEndPoint = 'authentication/register';
    private redirectUrl: string = '';

    constructor(
        private httpService: HttpService) {
    }

    register(username: string, fullname: string, password: string): Observable<any> {
        // TODO: split full name to fist name and last in front end
        return this.httpService.post(this.registerEndPoint, { 
                                        username, 
                                        firstName: fullname, 
                                        lastName: '', 
                                        password })
                               .map((res: Response) => res.json());
    }
}
