
import { Component, ViewChild, OnInit } from '@angular/core';
import { ReportTemplate, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {ReportTemplateService} from "../_services/index";

@Component({
    moduleId: module.id,
    templateUrl: './report.template.list.component.html'
})

export class ReportTemplateListComponent implements OnInit {
    dataResource: DataTableResource<ReportTemplate> = null;
    currentUser: User;
    reportTemplates: ReportTemplate[] = [];
    reportTemplateCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private ReportTemplateService: ReportTemplateService) {
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
        this.ReportTemplateService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(reportTemplates => this.reportTemplates = reportTemplates);
        this.dataResource.count().then(count => this.reportTemplateCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.ReportTemplateService.getAll().subscribe(reportTemplates => {
            this.dataResource = new DataTableResource<ReportTemplate>(reportTemplates);
            this.queryDataSource(params);
        });
    }

}