/**
 * Created by Josh Vogel on 8/1/2017.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { ClassTemplate, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import { ClassTemplateService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: './class.template.list.component.html'
})

export class ClassTemplateListComponent implements OnInit {
    dataResource: DataTableResource<ClassTemplate> = null;
    currentUser: User;
    classTemplates: ClassTemplate[] = [];
    classTemplateCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private ClassTemplateService: ClassTemplateService) {
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
        this.ClassTemplateService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(class_templates => this.classTemplates = class_templates);
        this.dataResource.count().then(count => this.classTemplateCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.ClassTemplateService.getAll().subscribe(class_templates => {
            this.dataResource = new DataTableResource<ClassTemplate>(class_templates);
            this.queryDataSource(params);
        });
    }

}