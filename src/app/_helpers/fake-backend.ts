import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    let surveys: any[] = JSON.parse(localStorage.getItem('surveys')) ||
        [{id:1, title:"Test Survey", description:"This is only a test.", published:true, authenticated:true, created_by:1,
            last_modified_by: 1, has_referral_code:true, referral_code_required:true, created_at:"2017-08-04 12:00:00",
            updated_at:"2017-08-04 12:00:00"}];

    let reports: any[] = JSON.parse(localStorage.getItem('reports')) ||
        [{id:1, organization_id:1, survey_id:1, name:"Test Report", description:"Some description", published:1,
        created_at:"2017-08-04 12:00:00", updated_at:"2017-08-04 12:00:00"}];

    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.username === params.username && user.password === params.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    connection.mockError(new Error('Username or password is incorrect'));
                }

                return;
            }

            // get surveys
            if (connection.request.url.endsWith('/api/surveys') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is
                // implemented server side in a real application
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: surveys })));
                return;
            }

            // get survey by id
            if (connection.request.url.match(/\/api\/surveys\/\d+$/)
                && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid,
                // this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1], 10);
                    let matchedSurveys = surveys.filter(survey => { return survey.id === id; });
                    let survey = matchedSurveys.length ? matchedSurveys[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: survey })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create survey
            if (connection.request.url.endsWith('/api/surveys') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newSurvey = JSON.parse(connection.request.getBody());

                // validation
                let duplicateSurvey = surveys.filter(survey => { return survey.title === newSurvey.title; }).length;
                if (duplicateSurvey) {
                    return connection.mockError(new Error('Survey Title "' + newSurvey.title + '" is already taken'));
                }

                // save new user
                newSurvey.id = surveys.length + 1;
                surveys.push(newSurvey);
                localStorage.setItem('surveys', JSON.stringify(surveys));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete survey
            if (connection.request.url.match(/\/api\/surveys\/\d+$/)
                && connection.request.method === RequestMethod.Delete) {
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

            // get surveys
            if (connection.request.url.endsWith('/api/report_templates') && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return users if valid, this security is
                // implemented server side in a real application
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: reports })));
                return;
            }

            // get survey by id
            if (connection.request.url.match(/\/api\/report_templates\/\d+$/)
                && connection.request.method === RequestMethod.Get) {
                // check for fake auth token in header and return user if valid,
                // this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1], 10);
                    let matchedReports = reports.filter(report => { return report.id === id; });
                    let report = matchedReports.length ? matchedReports[0] : null;

                    // respond 200 OK with user
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: report })));
                } else {
                    // return 401 not authorised if token is null or invalid
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }

                return;
            }

            // create survey
            if (connection.request.url.endsWith('/api/report_templatess') && connection.request.method === RequestMethod.Post) {
                // get new user object from post body
                let newReport = JSON.parse(connection.request.getBody());

                // validation
                let duplicateReport = reports.filter(report => { return report.name === newReport.name; }).length;
                if (duplicateReport) {
                    return connection.mockError(new Error('Report Title "' + newReport.title + '" is already taken'));
                }

                // save new user
                newReport.id = reports.length + 1;
                reports.push(newReport);
                localStorage.setItem('reports', JSON.stringify(reports));

                // respond 200 OK
                connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

                return;
            }

            // delete survey
            if (connection.request.url.match(/\/api\/report_templates\/\d+$/)
                && connection.request.method === RequestMethod.Delete) {
                // check for fake auth token in header and return user
                // if valid, this security is implemented server side in a real application
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1], 10);
                    for (let i = 0; i < reports.length; i++) {
                        let report = reports[i];
                        if (report.id === id) {
                            // delete user
                            reports.splice(i, 1);
                            localStorage.setItem('reports', JSON.stringify(surveys));
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

            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};