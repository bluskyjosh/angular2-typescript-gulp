import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { TreatmentCycleTemplate } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class TreatmentCycleTemplateService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'treatment_cycle_templates', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'treatment_cycle_templates/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    create(treatmentCycleTemplate: TreatmentCycleTemplate) {
        return this.http.post(this.ApiUrl + 'treatment_cycle_templates', treatmentCycleTemplate, this.jwt())
            .map((response: Response) => response.json());
    }

    update(treatmentCycleTemplate: TreatmentCycleTemplate) {
        return this.http.put(this.ApiUrl + 'treatment_cycle_templates/' + treatmentCycleTemplate.id, treatmentCycleTemplate, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'treatment_cycle_templates/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

}