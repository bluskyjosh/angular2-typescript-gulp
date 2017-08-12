import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Message} from '../_models/index';
import { AlertService, OrganizationService} from '../_services/index';
import {Organization} from "../_models/organization";

@Component({
    moduleId: module.id.toString(),
    templateUrl: './organization.settings.component.html'
})

export class OrganizationSettingsComponent implements OnInit {
    organization: Organization = new Organization();
    timezones: any[];
    loading = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private organizationService: OrganizationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.organizationService.get().subscribe( organiztion => this.organization = organiztion);
        this.timezones = this.organizationService.availableTimezones();
    }

    update() {
        this.loading = true;
        this.organizationService.update(this.organization).subscribe(
            data => {
                this.organization = data;
                this.alertService.success("Save Successful");
                this.loading = false;
            },
            error => {
                this.alertService.error(this.alertService.messageParse(error));
                this.loading = false;
            }
        );
    }

}
