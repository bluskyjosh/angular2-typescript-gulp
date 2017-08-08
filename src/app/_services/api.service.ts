/**
 * Created by Josh Vogel on 8/1/2017.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export abstract class ApiService {
    ApiUrl = AppSettings.apiUrl;

    constructor(protected http: Http) { }

    abstract getAll(parent_id?: number): Observable<any>;
    abstract getById(id:number, parent_id?:number): Observable<any>;
    abstract create (Object:object, parent_id?: number): Observable<any>;
    abstract update (Object:object, parent_id?: number): Observable<any>;
    abstract delete(id:number, parent_id?: number): Observable<any>;




    protected jwt() {
        // create authorization header with jwt token
        let userToken = JSON.parse(localStorage.getItem('userToken'));
        if (userToken && userToken.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + userToken.token });
            headers.append('Content-Type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }
}