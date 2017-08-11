import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { User} from "../_models/index";

let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({headers: headers});


@Injectable()
export class AuthenticationService {

    ApiUrl = AppSettings.apiUrl;
    private currentUser: Subject<User>;

    constructor(protected http: Http) {
        this.currentUser = <Subject<User>>new Subject();
    }

    get getCurrentUser() : Observable<User> {
        return this.currentUser.asObservable();
    }


    login(username: string, password: string) {
        return this.http.post(this.ApiUrl + 'authenticate',
            JSON.stringify({ username: username, password: password }), options).map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json();
                if (token && token.token) {
                    // store user details and jwt token in local storage to keep
                    // user logged in between page refreshes
                    sessionStorage.setItem('userToken', JSON.stringify(token));
                }

                return token;
            });
    }


    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userToken');
    }

    
    setCurrentUser() {
        return this.http.get(this.ApiUrl + 'authenticate/user_from_token', this.jwt()).map((response: Response) => {
            //got back a user
            let user = response.json();
            if (user) {
                sessionStorage.setItem('currentUser', JSON.stringify(user));
            }
            this.currentUser.next(user);
            return user;
        });
    }

    protected jwt() {
        // create authorization header with jwt token
        let userToken = JSON.parse(sessionStorage.getItem('userToken'));
        if (userToken && userToken.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + userToken.token });
            headers.append('Content-Type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }
}