import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ReportTemplate } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class ReportTemplateService extends ApiService {

    getAll() {
        return this.http.get('/api/report_templates', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/report_templates/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(reportTemplate: ReportTemplate) {
        return this.http.post( '/api/report_templates', reportTemplate, this.jwt()).map((response: Response) => response.json());
    }

    update(reportTemplate: ReportTemplate) {
        return this.http.put('/api/report_templates/' + reportTemplate.id, reportTemplate, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/report_templates/' + id, this.jwt()).map((response: Response) => response.json());
    }

}