import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import {AppSettings} from '../../environments/environment';

import { MessageTemplate } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class MessageTemplateService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'message_templates', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'message_templates/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(messageTemplate: MessageTemplate) {
        return this.http.post(this.ApiUrl + 'message_templates', messageTemplate, this.jwt()).map((response: Response) => response.json());
    }

    update(messageTemplate: MessageTemplate) {
        return this.http.put(this.ApiUrl + 'message_templates/' + messageTemplate.id, messageTemplate, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'message_templates/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getTemplateTypes() {
        return this.http.get(this.ApiUrl + 'message_template_types', this.jwt()).map((response: Response) => response.json());
    }

    getDeliveryTypes() {
        return this.http.get(this.ApiUrl + 'message_delviery_types', this.jwt()).map((response: Response) => response.json());
    }

}