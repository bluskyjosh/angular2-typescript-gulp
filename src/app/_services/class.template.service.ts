import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import {AppSettings} from '../../environments/environment';

import {  ClassTemplate } from '../_models/index';
import {ApiService} from "./api.service";


@Injectable()
export class ClassTemplateService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'class_templates', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'class_templates/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(classTemplate: ClassTemplate) {
        return this.http.post(this.ApiUrl + 'class_templates', classTemplate, this.jwt()).map((response: Response) => response.json());
    }

    update(classTemplate: ClassTemplate) {
        return this.http.put(this.ApiUrl + 'class_templates/' + classTemplate.id, classTemplate, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'class_templates/' + id, this.jwt()).map((response: Response) => response.json());
    }

}