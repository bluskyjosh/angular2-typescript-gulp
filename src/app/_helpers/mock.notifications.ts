import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


let notifications: any[] = JSON.parse(localStorage.getItem('notifications')) || [{
    id:1, organization_id:1, user_id:1, notification_type:"notification", send_method_type:"email", message_template_id:1,
    to:"someone@example.com", bcc:"", cc:"", subject:"Test Notification", body:"This is a test of the fake notification system",
    referral_code_id:1, status:"sent", sent_date:"2017-08-07 12:43:09", resent_date:"", resent_to:"", created_at:"2017-08-07 12:43:09"
}];

export class MockNotifications {
    //get notifications
    getAll(connection: MockConnection) {
        // check for fake auth token in header and return users if valid, this security is
        // implemented server side in a real application
        connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: notifications })));
        return;
    }

    // get notification by id
    getById(connection:MockConnection) {
        // check for fake auth token in header and return notification if valid,
        // this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1], 10);
            let matchedNotifications = notifications.filter(notification => { return notification.id === id; });
            let notification = matchedNotifications.length ? matchedNotifications[0] : null;

            // respond 200 OK with user
            connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: notification })));
        } else {
            // return 401 not authorised if token is null or invalid
            connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
        }

        return;
    }

    // create notification
    create(connection:MockConnection) {
        // get new user object from post body
        let newNotification = JSON.parse(connection.request.getBody());

        // validation
        let duplicatenotification = notifications.filter(notification => { return notification.name === newNotification.name; })
            .length;
        if (duplicatenotification) {
            return connection.mockError(new Error('notification  is already taken'));
        }

        // save new user
        newNotification.id = notifications.length + 1;
        notifications.push(newNotification);
        localStorage.setItem('notifications', JSON.stringify(notifications));

        // respond 200 OK
        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));

        return;
    }

    // delete notification
    delete(connection: MockConnection) {
        // check for fake auth token in header and return user
        // if valid, this security is implemented server side in a real application
        if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
            // find user by id in users array
            let urlParts = connection.request.url.split('/');
            let id = parseInt(urlParts[urlParts.length - 1], 10);
            for (let i = 0; i < notifications.length; i++) {
                let notification = notifications[i];
                if (notification.id === id) {
                    // delete user
                    notifications.splice(i, 1);
                    localStorage.setItem('notifications', JSON.stringify(notifications));
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
