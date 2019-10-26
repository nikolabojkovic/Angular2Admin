import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";

@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        // return  environment.apiUrl + req;
        return req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options === null || options === undefined) {
            options = new RequestOptions();
        }
        if (options.headers === null || options.headers === undefined) {
            options.headers = new Headers();
        }

        options.headers.append('Content-Type', 'application/json');

        if (localStorage.getItem("Authentication") !== null) {
            options.headers.append('Authorization', 'Bearer ' + localStorage.getItem("Authentication"));
        }

        return options;
    }
}
