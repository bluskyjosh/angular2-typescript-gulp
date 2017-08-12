import {Component, ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, OrganizationService, OrganizationIpRuleService} from '../_services/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {Organization, OrganizationIpRule} from "../_models/index";

@Component({
    moduleId: module.id.toString(),
    templateUrl: './organization.security.component.html'
})

export class OrganizationSecurityComponent implements OnInit {
    dataResource: DataTableResource<OrganizationIpRule> = null;
    ipRules: OrganizationIpRule[] = [];
    ipRuleCount: number = 0;

    IpRuleOptions:Array<any> = [
        {value:'Allow', text:'Allow'},
        {value:'Deny', text:'Deny'}
    ];

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;

    organization: Organization = new Organization();
    timezones: any[];
    loading = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private organizationService: OrganizationService,
        private IpRuleService: OrganizationIpRuleService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.organizationService.get().subscribe( organiztion => this.organization = organiztion);
    }

    reloadItems(params: DataTableParams) {
        if (this.dataResource == null) {
            this.loadAll(params);
        } else {
            this.queryDataSource(params);
        }
    }

    addItem($event:any) {
        let ipRule = new OrganizationIpRule();
        ipRule.cidr = "";
        ipRule.type = "Allow";
        this.ipRules.push(ipRule);
    }
    saveEditable(item:OrganizationIpRule, $event: any) {
        if (item.id != null) {
            this.IpRuleService.update(item).subscribe(
                data => {
                    let index = this.ipRules.indexOf(item);
                    this.ipRules[index] = data;
                    this.alertService.success("Save Successful");
                },
                error => {
                    this.alertService.error(this.alertService.messageParse(error));
                }
            );
        } else {
            this.IpRuleService.create(item).subscribe(
                data => {
                    let index = this.ipRules.indexOf(item);
                    this.ipRules[index] = data;
                    this.alertService.success("Save Successful");
                },
                error => {
                    this.alertService.error(this.alertService.messageParse(error));
                }
            );
        }
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

    deleteItem(id: number) {
        this.IpRuleService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private loadAll(params: DataTableParams) {
        this.IpRuleService.getAll().subscribe(ipRules => {
            this.dataResource = new DataTableResource<OrganizationIpRule>(ipRules);
            this.queryDataSource(params);
        });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(ipRules => this.ipRules = ipRules);
        this.dataResource.count().then(count => this.ipRuleCount = count);
    }

}