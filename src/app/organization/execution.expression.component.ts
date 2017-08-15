import {Component, ViewChild, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTable, DataTableResource, DataTableTranslations, DataTableParams } from 'angular-4-data-table';
import { AlertService, CourseService, ExecutionExpressionService, UserService} from '../_services/index';
import {Course, User, ExecutionExpression} from "../_models/index";
import {SingleExpression} from "../_models/single.expression";
import {SingleExpressionComponent} from "../_directives/_single_expression/single.expression.component";


@Component({
    moduleId: module.id.toString(),
    templateUrl: './execution.expression.component.html',
})

export class ExecutionExpressionComponent implements OnInit {
    loading = false;
    selectedActionType:string = "";
    actionTypes: Object[];
    executionExpressionResource: DataTableResource<ExecutionExpression> = null;
    executionExpressions: ExecutionExpression[] = [];
    executionExpressionCount: number = 0;

    selectedExpression:ExecutionExpression = new ExecutionExpression();

    singleExpressionResource: DataTableResource<SingleExpression> = new DataTableResource<SingleExpression>([]);
    selectedExpressionConditions:SingleExpression[] = [];
    conditionCount:number = 0;

    singleExpression:SingleExpression = new SingleExpression();

    aggregateConditions: Object[];
    courses: Course[];
    providers: User[];
    extendedProperties: Object[];

    @ViewChild('expressionGrid') expressionGrid: DataTable;
    @ViewChild('conditionGrid') conditionGrid: DataTable;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ExecutionExpressionService: ExecutionExpressionService,
        private CourseService: CourseService,
        private UserService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.ExecutionExpressionService.expressionTypes().subscribe(executionTypes => this.actionTypes = executionTypes);
        this.ExecutionExpressionService.aggregateOperators().subscribe( aggregateTypes => this.aggregateConditions = aggregateTypes);
        this.CourseService.getAll().subscribe(courses => this.courses = courses);
        this.UserService.getProviders().subscribe(providers => this.providers = providers);
    }

    reloadExecutionExpressions(params: DataTableParams, reload: boolean = false) {
        if (this.executionExpressionResource == null || reload) {
            this.loadAllExecutionExpressions(params);
        } else {
            this.queryExecutionExpressionDataSource(params);
        }
    }

    selectedActionTypeChanged(event: any) {
        this.reloadExecutionExpressions(this.expressionGrid.displayParams, false);

    }

    selectedExpressionChanged(event: any) {
        this.selectedExpression = event.row.item;
        this.reloadSingleExpressions(this.conditionGrid.displayParams, true);
    }

    reloadSingleExpressions(params: DataTableParams, reload:boolean = false) {
        if ((this.singleExpressionResource == null || reload) && this.selectedExpression !== null) {
            this.loadSingleExpressions(params);
        } else if (this.selectedExpression !== null) {
            this.querySingleExpressionDataResource(params);
        }
    }

    addExecutionExpression(event: any) {
        let newExpression = new ExecutionExpression();
        this.executionExpressions.push(newExpression);
    }

    addCondition(event: any) {
        let newCondition = new SingleExpression();
        newCondition.category = '';
        newCondition.left = {};
        newCondition.middle = {};
        newCondition.right = {};
        this.selectedExpressionConditions.push(newCondition);
    }

    update() {
        this.loading = true;
        let updateExpression = new ExecutionExpression();

        let items = this.conditionGrid.items;
        updateExpression = this.selectedExpression;
        updateExpression.conditions = JSON.stringify(items);

         this.ExecutionExpressionService.update(updateExpression).subscribe(
            data => {
                let index = this.executionExpressions.indexOf(this.selectedExpression);
                this.executionExpressions[index] = data;
                 this.selectedExpression = data;
                 this.loadSingleExpressions(this.conditionGrid.displayParams);
                 this.alertService.success("Save Successful");
                 this.loading = false;
             },
             error => {
                 this.alertService.error(this.alertService.messageParse(error));
                 this.loading = false;
             }
         );
    }

    deleteCondition(item:SingleExpression, $event:any) {
        let index = this.conditionGrid.items.indexOf(item);
        this.conditionGrid.items.splice(index, 1);
    }

    private loadAllExecutionExpressions(params: DataTableParams) {
        this.ExecutionExpressionService.getAll().subscribe(executionExpressions => {
            this.executionExpressionResource = new DataTableResource<ExecutionExpression>(executionExpressions);
            this.queryExecutionExpressionDataSource(params);
        });
    }

    private queryExecutionExpressionDataSource(params: DataTableParams) {
        this.executionExpressionResource.query(params,
            (expression => expression.expression_type === this.selectedActionType || this.selectedActionType === ""))
            .then(executionExpressions => this.executionExpressions = executionExpressions);
        this.executionExpressionResource.count().then(count => this.executionExpressionCount = count);
    }

    private loadSingleExpressions (params: DataTableParams) {
            this.singleExpressionResource = new DataTableResource<SingleExpression>(JSON.parse(this.selectedExpression.conditions));
            this.querySingleExpressionDataResource(params);
    }

    private querySingleExpressionDataResource (params: DataTableParams) {
        this.singleExpressionResource.query(params).then(singleExpressions => this.selectedExpressionConditions = singleExpressions);
        this.singleExpressionResource.count().then(count => this.conditionCount = count);
    }



}