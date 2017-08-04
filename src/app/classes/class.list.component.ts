/**
 * Created by Josh Vogel on 8/1/2017.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { ClassModel, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import { ClassService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: './class.list.component.html'
})

export class ClassListComponent implements OnInit {
    classResource: DataTableResource<ClassModel> = null;
    currentUser: User;
    classes: ClassModel[] = [];
    classCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) userTable: DataTable;


    constructor(private ClassService: ClassService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    reloadItems(params: DataTableParams) {
        if (this.classResource == null) {
            this.loadAllClasses(params);
        } else {
            this.queryDataSource(params);
        }
    }

    deleteClass(id: number) {
        this.ClassService.delete(id).subscribe(() => { this.loadAllClasses(this.userTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.classResource.query(params).then(classes => this.classes = classes);
        this.classResource.count().then(count => this.classCount = count);
    }

    private loadAllClasses(params: DataTableParams) {
        this.ClassService.getAll().subscribe(classes => {
            this.classResource = new DataTableResource<ClassModel>(classes);
            this.queryDataSource(params);
        });
    }

}