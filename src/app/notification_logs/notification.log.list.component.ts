
import { Component, ViewChild, OnInit } from '@angular/core';
import { Notification, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {NotificationService} from "../_services/index";

@Component({
    moduleId: module.id,
    templateUrl: './notification.log.list.component.html'
})

export class NotificationLogListComponent implements OnInit {
    dataResource: DataTableResource<Notification> = null;
    currentUser: User;
    notifications: Notification[] = [];
    notificationCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private NotificationService: NotificationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    reloadItems(params: DataTableParams) {
        if (this.dataResource == null) {
            this.loadAll(params);
        } else {
            this.queryDataSource(params);
        }
    }

    deleteItem(id: number) {
        this.NotificationService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(notifications => this.notifications = notifications);
        this.dataResource.count().then(count => this.notificationCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.NotificationService.getAll().subscribe(reportTemplates => {
            this.dataResource = new DataTableResource<Notification>(reportTemplates);
            this.queryDataSource(params);
        });
    }

}