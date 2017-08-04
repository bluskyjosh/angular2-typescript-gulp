/**
 * Created by Josh Vogel on 8/1/2017.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: './user.list.component.html'
})

export class UserListComponent implements OnInit {
    dataResource: DataTableResource<User> = null;
    currentUser: User;
    users: User[] = [];
    userCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private userService: UserService) {
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
        this.userService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(users => this.users = users);
        this.dataResource.count().then(count => this.userCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.userService.getAll().subscribe(users => {
            this.dataResource = new DataTableResource<User>(users);
            this.queryDataSource(params);
        });
    }

}