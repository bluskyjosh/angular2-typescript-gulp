import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({headers: headers});


@Injectable()
export class AuthenticationService extends ApiService {

    login(username: string, password: string) {
        return this.http.post(this.ApiUrl + 'authenticate',
            JSON.stringify({ username: username, password: password }), options).map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json();
                if (token && token.token) {
                    // store user details and jwt token in local storage to keep
                    // user logged in between page refreshes
                    localStorage.setItem('userToken', JSON.stringify(token));
                }

                return token;
            });
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userToken');
    }

    
    setCurrentUser() {
        return this.http.get(this.ApiUrl + 'authenticate/user_from_token', this.jwt()).map((response: Response) => {
            //got back a user
            let user = response.json();
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        });
    }
}