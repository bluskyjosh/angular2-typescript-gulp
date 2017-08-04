
import { Component, ViewChild, OnInit } from '@angular/core';
import { MessageTemplate, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {MessageTemplateService} from "../_services/index";

@Component({
    moduleId: module.id,
    templateUrl: './message.template.list.component.html'
})

export class MessageTemplateListComponent implements OnInit {
    dataResource: DataTableResource<MessageTemplate> = null;
    currentUser: User;
    messageTemplates: MessageTemplate[] = [];
    messageTemplateCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private MessageTemplateService: MessageTemplateService) {
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
        this.MessageTemplateService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(messageTemplates => this.messageTemplates = messageTemplates);
        this.dataResource.count().then(count => this.messageTemplateCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.MessageTemplateService.getAll().subscribe(messageTemplates => {
            this.dataResource = new DataTableResource<MessageTemplate>(messageTemplates);
            this.queryDataSource(params);
        });
    }

}