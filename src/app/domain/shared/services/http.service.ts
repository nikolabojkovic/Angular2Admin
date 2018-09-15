import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable()
export class HttpService {

    constructor(private http: Http) { }

    get(url): Observable<any>{
        return this.http.get(`${environment.apiUrl}${url}`);
    }

    post(url, data): Observable<any> {
        return this.http.post(`${environment.apiUrl}${url}`, data, this.headers());
    }

    put(url, data): Observable<any> {
        return this.http.put(`${environment.apiUrl}${url}`, data, this.headers());
    }

    delete(url): Observable<any> {
        return this.http.delete(`${environment.apiUrl}${url}`, this.headers());
    }

    private headers(){
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', environment.frontEndUrl);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        // TODO: add user toke for retistration if needed

        return new RequestOptions({headers: headers});
    }
}