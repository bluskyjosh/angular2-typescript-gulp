import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {MockSurveyTemplates} from "./mock.survey.templates";
import {MockReportTemplates} from "./mock.report.templates";
import {MockNotifications} from "./mock.notifications";

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {
    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];

    let mockSurveyBackend = new MockSurveyTemplates();
    let mockReportBackend = new MockReportTemplates();
    let mockNotificationBackend = new MockNotifications();

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
                mockSurveyBackend.getAll(connection);
                return;
            }

            // get survey by id
            if (connection.request.url.match(/\/api\/surveys\/\d+$/)
                && connection.request.method === RequestMethod.Get) {
               mockSurveyBackend.getByID(connection);
               return;
            }

            // create survey
            if (connection.request.url.endsWith('/api/surveys') && connection.request.method === RequestMethod.Post) {
              mockSurveyBackend.create(connection);
              return;
            }

            // delete survey
            if (connection.request.url.match(/\/api\/surveys\/\d+$/)
                && connection.request.method === RequestMethod.Delete) {
                mockSurveyBackend.delete(connection);
                return;
            }

            // get reports
            if (connection.request.url.endsWith('/api/report_templates') && connection.request.method === RequestMethod.Get) {
                mockReportBackend.getAll(connection);
                return;
            }

            // get report by id
            if (connection.request.url.match(/\/api\/report_templates\/\d+$/)
                && connection.request.method === RequestMethod.Get) {
                mockReportBackend.getById(connection);
                return;
            }

            // create report
            if (connection.request.url.endsWith('/api/report_templates') && connection.request.method === RequestMethod.Post) {
                mockReportBackend.create(connection);
                return;
            }

            // delete report
            if (connection.request.url.match(/\/api\/report_templates\/\d+$/)
                && connection.request.method === RequestMethod.Delete) {
               mockReportBackend.delete(connection);
               return;
            }

            // get notifications
            if (connection.request.url.endsWith('/api/notifications') && connection.request.method === RequestMethod.Get) {
                mockNotificationBackend.getAll(connection);
                return;
            }

            // get notification by id
            if (connection.request.url.match(/\/api\/notifications\/\d+$/)
                && connection.request.method === RequestMethod.Get) {
                mockNotificationBackend.getById(connection);
                return;
            }

            // create notification
            if (connection.request.url.endsWith('/api/notifications') && connection.request.method === RequestMethod.Post) {
                mockNotificationBackend.create(connection);
                return;
            }

            // delete notification
            if (connection.request.url.match(/\/api\/notifications\/\d+$/)
                && connection.request.method === RequestMethod.Delete) {
                mockNotificationBackend.delete(connection);
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