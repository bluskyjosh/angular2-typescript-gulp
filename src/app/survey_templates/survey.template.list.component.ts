
import { Component, ViewChild, OnInit } from '@angular/core';
import { SurveyTemplate, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {SurveyTemplateService} from "../_services/index";

@Component({
    moduleId: module.id,
    templateUrl: './survey.template.list.component.html'
})

export class SurveyTemplateListComponent implements OnInit {
    dataResource: DataTableResource<SurveyTemplate> = null;
    currentUser: User;
    surveyTemplates: SurveyTemplate[] = [];
    surveyTemplateCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private SurveyTemplateService: SurveyTemplateService) {
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
        this.SurveyTemplateService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(surveyTemplates => this.surveyTemplates = surveyTemplates);
        this.dataResource.count().then(count => this.surveyTemplateCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.SurveyTemplateService.getAll().subscribe(surveyTemplates => {
            this.dataResource = new DataTableResource<SurveyTemplate>(surveyTemplates);
            this.queryDataSource(params);
        });
    }

}