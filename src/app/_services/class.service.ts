import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import {AppSettings} from '../../environments/environment';

import { User } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class ClassService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'classes', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'classes/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.ApiUrl + 'classes', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put(this.ApiUrl + 'classes/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'classes/' + id, this.jwt()).map((response: Response) => response.json());
    }

}