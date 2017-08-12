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

    //Returns Timezones available to be selected.
    //ToDo: Pull this from api when reference object is available
    availableTimezones() {
        return [
            {machine_name: "US/Hawaii", display_name: 'US/Hawaii'},
            {machine_name: "US/Aleutian", display_name: 'US/Aleutian'},
            {machine_name: "US/Alaska", display_name: 'US/Alaska'},
            {machine_name: "US/Arizona", display_name:'US/Arizona'},
            {machine_name: "US/Pacific", display_name: 'US/Pacific'},
            {machine_name: "US/Mountain", display_name: 'US/Mountain'},
            {machine_name: "US/Central", display_name: 'US/Central'},
            {machine_name: "US/Eastern", display_name: 'US/Eastern'},
            {machine_name: "Canada/Atlantic", display_name: 'Canada/Atlantic'}
        ];
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