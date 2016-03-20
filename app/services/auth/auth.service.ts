import { Injectable, EventEmitter} from 'angular2/core';

import {Http, Headers, Response} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AppConfig} from "../../app.config";


@Injectable()
export class AuthService {

    private locationWatcher = new EventEmitter();
    private expires: any = 0;
    private authenticated: boolean = this.isAuthenticated();
    private token: string;

    constructor(
        private http: Http,
        private config: AppConfig) {}

    public subscribe(onNext: (value: any) => void, onThrow?: (exception: any) => void, onReturn?: () => void) {
        return this.locationWatcher.subscribe(onNext, onThrow, onReturn);
    }

    account() {
        return this.http.get(this.config.base + 'rest/user_manager/account')
            .map((res: Response) => {
                    res.json();
                    localStorage.setItem('token', res.json());
                }
            )
            .catch(this.handleError);
    }
    logout() {
        this.http.get(this.config.base + 'app/logout');
        console.log("Remove Token");
        localStorage.removeItem('token');
        this.authenticated = false;
        this.emitAuthStatus(true);
    }
    login( username: string, password: string, rememberMe: boolean) {
        let headers = new Headers();
        let data = "j_username=" + username + "&j_password=" + password + "&_spring_security_remember_me=" + rememberMe + "&submit=Login";
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        return this.http.post(this.config.base + 'app/authentication', data, {headers: headers})
            .map((res: Response) => {
                this.authenticated = true;
                this.emitAuthStatus(true);
                }
            )
            .catch(this.handleError);
    }
    handleError(error: Response) {
        console.error(error);
        return Observable.create(observer => observer.complete());
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    private emitAuthStatus(success: boolean) {
        this.locationWatcher.emit({success: success, authenticated: this.authenticated, token: this.token, expires: this.expires});
    }
}
