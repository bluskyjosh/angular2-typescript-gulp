import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

let surveys: any[] = JSON.parse(localStorage.getItem('surveys')) ||
    [{id:1, title:"Test Survey", description:"This is only a test.", published:true, authenticated:true, created_by:1,
        last_modified_by: 1, has_referral_code:true, referral_code_required:true, created_at:"2017-08-04 12:00:00",
        updated_at:"2017-08-04 12:00:00"}];
export class MockSurveyTemplates {

    // get surveys
    public getAll(connection: MockConnection) {
        connection.mockRespond(new Response(new ResponseOptions({status: 200, body: surveys})));
        return;
    }

    public getByID(connection: MockConnection) {
        // check for fake auth token in header and return user if valid,
        // this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1], 10);
            let matchedSurveys = surveys.filter(survey => {
                return survey.id === id;
            });
            let survey = matchedSurveys.length ? matchedSurveys[0] : null;

            // respond 200 OK with user
            connection.mockRespond(new Response(new ResponseOptions({status: 200, body: survey})));
        } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({status: 401})));
        }

        return;
    }

    // create survey
    public create(connection: MockConnection) {
        let newSurvey = JSON.parse(connection.request.getBody());

        // validation
        let duplicateSurvey = surveys.filter(survey => {
            return survey.title === newSurvey.title;
        }).length;
        if (duplicateSurvey) {
            return connection.mockError(new Error('Survey Title "' + newSurvey.title + '" is already taken'));
        }

        // save new user
        newSurvey.id = surveys.length + 1;
        surveys.push(newSurvey);
        localStorage.setItem('surveys', JSON.stringify(surveys));

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({status: 200})));

        return;
    }

    // delete survey
    public delete(connection: MockConnection) {
        // check for fake auth token in header and return user
        // if valid, this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1], 10);
            for (let i = 0; i < surveys.length; i++) {
                let survey = surveys[i];
                if (survey.id === id) {
                    // delete user
                    surveys.splice(i, 1);
                    localStorage.setItem('surveys', JSON.stringify(surveys));
                    break;
                }
            }

            // respond 200 OK
            connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
        } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
    }


}