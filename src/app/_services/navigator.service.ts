/**
 * Created by Josh Vogel on 7/31/2017.
 */
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavigatorService {
    private showNavigation: Subject<boolean>;
    constructor() {
        this.showNavigation = <Subject<boolean>>new Subject();
    }
    get displayNavigation() : Observable<boolean> {
        return this.showNavigation.asObservable();
    }
    toggleNavigation(urlPath: string) {
        let showNav: boolean;
        if (urlPath === 'login' || urlPath === 'register') {
            showNav = false;
        } else {
            showNav = true;
        }
        console.log(showNav);
        this.showNavigation.next(showNav);
    }
}