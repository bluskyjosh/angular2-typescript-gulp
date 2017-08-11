import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppSettings } from '../environments/environment';
import { Organization } from "../_models/index";


let headers = new Headers();
headers.append('Content-Type', 'application/json');
let options = new RequestOptions({headers: headers});


@Injectable()
export class OrganizationService  {

    constructor (protected http: Http) { }

    ApiUrl = AppSettings.apiUrl;
    get() {
        return this.http.get(this.ApiUrl + 'organization/', this.jwt()).map((response: Response) => response.json());
    }

    update(organization: Organization) {
        return this.http.put(this.ApiUrl + 'organization/', organization, this.jwt())
            .map((response: Response) => response.json());
    }

    protected jwt() {
        // create authorization header with jwt token
        let userToken = JSON.parse(sessionStorage.getItem('userToken'));
        if (userToken && userToken.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + userToken.token });
            headers.append('Content-Type', 'application/json');
            return new RequestOptions({ headers: headers });
        }
    }
}