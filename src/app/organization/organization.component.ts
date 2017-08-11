import { Component } from '@angular/core';
import {User} from "../_models/user";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'organization.component.html'
})

export class OrganizationComponent {
    currentUser: User;
    constructor() {
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }
}