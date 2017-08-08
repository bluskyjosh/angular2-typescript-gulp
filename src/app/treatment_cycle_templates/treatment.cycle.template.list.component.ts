
import { Component, ViewChild, OnInit } from '@angular/core';
import { TreatmentCycleTemplate, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {TreatmentCycleTemplateService} from "../_services/index";

@Component({
    moduleId: module.id,
    templateUrl: './treatment.cycle.template.list.component.html'
})

export class TreatmentCycleTemplateListComponent implements OnInit {
    dataResource: DataTableResource<TreatmentCycleTemplate> = null;
    currentUser: User;
    treatmentCycleTemplates: TreatmentCycleTemplate[] = [];
    treatmentCycleTemplateCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private TreatmentCycleTemplateService: TreatmentCycleTemplateService) {
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
        this.TreatmentCycleTemplateService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(treatmentCycleTemplates => this.treatmentCycleTemplates = treatmentCycleTemplates);
        this.dataResource.count().then(count => this.treatmentCycleTemplateCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.TreatmentCycleTemplateService.getAll().subscribe(treatmentCycleTemplates => {
            this.dataResource = new DataTableResource<TreatmentCycleTemplate>(treatmentCycleTemplates);
            this.queryDataSource(params);
        });
    }

}