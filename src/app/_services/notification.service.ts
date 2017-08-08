import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Notification } from "../_models/index";
import {ApiService} from "./api.service";

@Injectable()
export class NotificationService extends ApiService {

    getAll() {
        return this.http.get('/api/notifications', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/notifications/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(notification: Notification) {
        return this.http.post( '/api/notifications', notification, this.jwt()).map((response: Response) => response.json());
    }

    update(notification: Notification) {
        return this.http.put('/api/notifications/' + notification.id, notification, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/notifications/' + id, this.jwt()).map((response: Response) => response.json());
    }

}