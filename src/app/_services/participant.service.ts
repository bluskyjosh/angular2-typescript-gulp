import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
//import {AppSettings} from '../../environments/environment';

import { Participant } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class ParticipantService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'participants', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'participants/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(participant: Participant) {
        return this.http.post(this.ApiUrl + 'participants', participant, this.jwt()).map((response: Response) => response.json());
    }

    update(participant: Participant) {
        return this.http.put(this.ApiUrl + 'participants/' + participant.id, participant, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'participants/' + id, this.jwt()).map((response: Response) => response.json());
    }

}