/**
 * Created by Josh Vogel on 8/1/2017.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { ClassObject, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import { ClassService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: './class.list.component.html'
})

export class ClassListComponent implements OnInit {
    dataResource: DataTableResource<ClassObject> = null;
    currentUser: User;
    classes: ClassObject[] = [];
    classCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private ClassService: ClassService) {
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
        this.ClassService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(classes => this.classes = classes);
        this.dataResource.count().then(count => this.classCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.ClassService.getAll().subscribe(classes => {
            this.dataResource = new DataTableResource<ClassObject>(classes);
            this.dataResource = new DataTableResource<ClassObject>(classes);
            this.queryDataSource(params);
        });
    }

}