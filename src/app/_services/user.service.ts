import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import {AppSettings} from '../../environments/environment';

import { User } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class UserService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.ApiUrl + 'users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.ApiUrl + 'users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getProviders() {
        return this.http.get(this.ApiUrl + 'providers', this.jwt()).map((response: Response) => response.json());
    }

}