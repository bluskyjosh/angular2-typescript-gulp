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
    userResource: DataTableResource<User>;
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

    @ViewChild(DataTable) userTable: DataTable;


    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    reloadItems(params: DataTableParams) {
        this.loadAllUsers(params);
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers(this.userTable.displayParams); });
    }

    private loadAllUsers(params: DataTableParams) {
        this.userService.getAll().subscribe(users => {
            this.userResource = new DataTableResource<User>(users);
            this.userResource.query(params).then(users => this.users = users);
            this.userResource.count().then(count => this.userCount = count);
        });
    }

}