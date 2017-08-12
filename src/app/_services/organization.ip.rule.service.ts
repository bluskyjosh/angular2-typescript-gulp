import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { OrganizationIpRule } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class OrganizationIpRuleService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'organization_iprules', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'organization_iprules/' + id , this.jwt())
            .map((response: Response) => response.json());
    }

    create(ipRule: OrganizationIpRule) {
        return this.http.post(this.ApiUrl + 'organization_iprules', ipRule, this.jwt())
            .map((response: Response) => response.json());
    }

    update(ipRule: OrganizationIpRule) {
        return this.http.put(this.ApiUrl + 'organization_iprules/' + ipRule.id,
            ipRule, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'organization_iprules/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

}