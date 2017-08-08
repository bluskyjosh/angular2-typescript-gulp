import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { NormativeItemBatch } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class NormativeItemBatchService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'normative_item_batches', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'normative_item_batches/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(batch: NormativeItemBatch) {
        return this.http.post(this.ApiUrl + 'normative_item_batches', batch, this.jwt()).map((response: Response) => response.json());
    }

    update(batch: NormativeItemBatch) {
        return this.http.put(this.ApiUrl + 'normative_item_batches/' + batch.id, batch, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'normative_item_batches/' + id, this.jwt()).map((response: Response) => response.json());
    }

}