import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import {AppSettings} from '../../environments/environment';

import { ClassObject } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class ClassService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'classes', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'classes/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(classObj: ClassObject) {
        return this.http.post(this.ApiUrl + 'classes', classObj, this.jwt()).map((response: Response) => response.json());
    }

    update(classObj: ClassObject) {
        return this.http.put(this.ApiUrl + 'classes/' + classObj.id, classObj, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'classes/' + id, this.jwt()).map((response: Response) => response.json());
    }

}