import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NormativeItemCategory } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class NormativeItemCategoryService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'normative_item_categories', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'normative_item_categories/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

    create(category: NormativeItemCategory) {
        return this.http.post(this.ApiUrl + 'normative_item_categories', category, this.jwt())
            .map((response: Response) => response.json());
    }

    update(category: NormativeItemCategory) {
        return this.http.put(this.ApiUrl + 'normative_item_categories/' + category.id, category, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'normative_item_categories/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

}