
import { Component, ViewChild, OnInit } from '@angular/core';
import { NormativeItemBatch, NormativeItemCategory, NormativeItem, User } from '../_models/index';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import {NormativeItemBatchService, NormativeItemCategoryService, NormativeItemService} from "../_services/index";
import {ApiService} from "../_services/api.service";

@Component({
    moduleId: module.id,
    templateUrl: './normative.item.list.component.html'
})

export class NormativeItemListComponent implements OnInit {
    batchResource: DataTableResource<NormativeItemBatch> = null;
    categoryResource: DataTableResource<NormativeItemCategory> = null;
    normativeItemResource: DataTableResource<NormativeItem> = null;

    currentUser: User;

    batches: NormativeItemBatch[] = [];
    batchCount:number = 0;
    selectedBatchId: number = 0;

    categories: NormativeItemCategory[] = [];
    categoryCount: number = 0;

    normativeItems: NormativeItem[] = [];
    normativeItemCount: number = 0;

    translations = <DataTableTranslations> {
        indexColumn: 'Index column',
        expandColumn: 'Expand column',
        selectColumn: 'Select column',
        paginationLimit: 'Max results',
        paginationRange: 'Result range'

    };

    @ViewChild('batchGrid') batchGrid: DataTable;
    @ViewChild('normativeItemGrid') normativeItemGrid: DataTable;


    constructor(private NormativeItemBatchService: NormativeItemBatchService,
                private NormativeItemCategoryService: NormativeItemCategoryService,
                private NormativeItemService: NormativeItemService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    reloadBatches(params: DataTableParams) {
        if (this.batchResource == null) {
            this.loadAllBatches(params);
        } else {
            this.queryBatchDataSource(params);
        }
    }

    selectedBatchChanged(event: any) {
        this.selectedBatchId = event.row.item.id;
        this.reloadNormativeItems(this.normativeItemGrid.displayParams, true);
    }

/*    reloadCategories(params: DataTableParams) {
        if (this.categoryResource == null) {
            this.loadAll({itemService: this.NormativeItemCategoryService,
                dataSource: this.categoryResource,
                items: this.categories,
                itemCount: this.categoryCount,
                params: params});
        } else {
            this.queryDataSource({dataSource: this.categoryResource,
                items: this.categories,
                itemCount: this.categoryCount,
                params: params});
        }
    }*/

    reloadNormativeItems(params: DataTableParams, reload:boolean = false) {
        if ((this.normativeItemResource == null || reload) && this.selectedBatchId !== 0) {
            this.loadAllNormativeItems(params);
        } else if (this.selectedBatchId !== 0) {
            this.queryNormativeItemDataResource(params);
        }
    }


    private loadAllBatches(params: DataTableParams) {
        this.NormativeItemBatchService.getAll().subscribe(batches => {
            this.batchResource = new DataTableResource<NormativeItemBatch>(batches);
            this.queryBatchDataSource(params);
        });
    }

    private queryBatchDataSource (params: DataTableParams) {
        this.batchResource.query(params).then(batches => this.batches = batches);
        this.batchResource.count().then(count => this.batchCount = count);
    }

    private loadAllNormativeItems(params: DataTableParams) {
        this.NormativeItemService.getAll(this.selectedBatchId).subscribe(normativeItems => {
            this.normativeItemResource = new DataTableResource<NormativeItem>(normativeItems);
            this.queryNormativeItemDataResource (params);
        });
    }

    private queryNormativeItemDataResource (params: DataTableParams) {
        this.normativeItemResource.query(params).then(normativeItems => this.normativeItems = normativeItems);
        this.normativeItemResource.count().then(count => this.normativeItemCount = count);
    }

}