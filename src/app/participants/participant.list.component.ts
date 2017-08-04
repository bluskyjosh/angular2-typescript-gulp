/**
 * Created by Josh Vogel on 8/1/2017.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Participant, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {ParticipantService} from "../_services/index";

@Component({
    moduleId: module.id,
    templateUrl: './participant.list.component.html'
})

export class ParticipantListComponent implements OnInit {
    dataResource: DataTableResource<Participant> = null;
    currentUser: User;
    participants: Participant[] = [];
    participantCount:number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild(DataTable) viewTable: DataTable;


    constructor(private ParticipantService: ParticipantService) {
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
        this.ParticipantService.delete(id).subscribe(() => { this.loadAll(this.viewTable.displayParams); });
    }

    private queryDataSource (params: DataTableParams) {
        this.dataResource.query(params).then(participants => this.participants = participants);
        this.dataResource.count().then(count => this.participantCount = count);
    }

    private loadAll(params: DataTableParams) {
        this.ParticipantService.getAll().subscribe(participants => {
            this.dataResource = new DataTableResource<Participant>(participants);
            this.queryDataSource(params);
        });
    }

}