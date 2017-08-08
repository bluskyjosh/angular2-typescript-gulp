import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

let reports: any[] = JSON.parse(localStorage.getItem('reports')) ||
    [{id:1, organization_id:1, survey_id:1, name:"Test Report", description:"Some description", published:1,
        created_at:"2017-08-04 12:00:00", updated_at:"2017-08-04 12:00:00"}];


export class MockReportTemplates {
    //get reports
    getAll(connection:MockConnection) {
        // check for fake auth token in header and return users if valid, this security is
        // implemented server side in a real application
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: reports })));
        return;
    }

    // get report by id
    getById(connection:MockConnection) {
        // check for fake auth token in header and return report if valid,
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

    // create report
    create(connection:MockConnection) {
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

    // delete report
    delete(connection: MockConnection) {
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
                    localStorage.setItem('reports', JSON.stringify(reports));
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