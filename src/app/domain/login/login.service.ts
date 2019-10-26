import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/services/http.service';


@Injectable()
export class LoginService {

    private loginEndPoint = 'authentication/login';
    private redirectUrl: string = '';

    constructor(
        private httpService: HttpService) {
    }

    login(username: string, password: string): Observable<any> {
        return this.httpService.post(this.loginEndPoint, { username, password })
                               .map((res: Response) => res.json());
    }
}
