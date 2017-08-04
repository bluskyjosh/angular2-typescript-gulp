import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import {AppSettings} from '../../environments/environment';

import { SurveyTemplate } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class SurveyTemplateService extends ApiService {

    getAll() {
        return this.http.get( '/api/surveys', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + '/api/surveys/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(surveyTemplate: SurveyTemplate) {
        return this.http.post(this.ApiUrl + '/api/surveys', surveyTemplate, this.jwt()).map((response: Response) => response.json());
    }

    update(surveyTemplate: SurveyTemplate) {
        return this.http.put(this.ApiUrl + '/api/surveys/' + surveyTemplate.id, surveyTemplate, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + '/api/surveys/' + id, this.jwt()).map((response: Response) => response.json());
    }

}