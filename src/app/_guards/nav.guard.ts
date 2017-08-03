/**
 * Created by Josh Vogel on 7/31/2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavigatorService } from '../_services/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NavGuard implements CanActivate {

    constructor(private router: Router, private navigatorService: NavigatorService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.navigatorService.toggleNavigation(route.url[0].path);
        return true;
    }
}