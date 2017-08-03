import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavigatorService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private navigatorService: NavigatorService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.navigatorService.toggleNavigation(state.url);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.navigatorService.toggleNavigation('login');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    
    private validateJWT() {
    }
}