import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NormativeItem } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class NormativeItemService extends ApiService {

    getAll(batch_id:number) {
        return this.http.get(this.ApiUrl + 'normative_item_batches/' + batch_id + '/normative_items', this.jwt())
            .map((response: Response) => response.json());
    }

    getById(id: number, batch_id: number) {
        return this.http.get(this.ApiUrl + 'normative_item_batches/' + batch_id + '/normative_items/' + id , this.jwt())
            .map((response: Response) => response.json());
    }

    create(normativeItem: NormativeItem, batch_id: number) {
        return this.http.post(this.ApiUrl + 'normative_item_batches/' + batch_id, normativeItem, this.jwt())
            .map((response: Response) => response.json());
    }

    update(normativeItem: NormativeItem, batch_id: number) {
        return this.http.put(this.ApiUrl + 'normative_item_batches/' + batch_id + '/normative_items/' + normativeItem.id,
            normativeItem, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number, batch_id: number) {
        return this.http.delete(this.ApiUrl + 'normative_item_batches/' + batch_id + '/normative_items/' + id, this.jwt())
            .map((response: Response) => response.json());
    }

}