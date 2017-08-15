import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ExecutionExpression } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class ExecutionExpressionService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'execution_expressions', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'execution_expressions/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(executionExpression: ExecutionExpression) {
        return this.http.post(this.ApiUrl + 'execution_expressions', executionExpression, this.jwt())
            .map((response: Response) => response.json());
    }

    update(executionExpression: ExecutionExpression) {
        return this.http.put(this.ApiUrl + 'execution_expressions/' + executionExpression.id, executionExpression, this.jwt())
            .map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'execution_expressions/' + id, this.jwt()).map((response: Response) => response.json());
    }

    expressionTypes() {
        return this.http.get(this.ApiUrl + 'execution_expression_types', this.jwt()).map((response: Response) => response.json());
    }

    comparisonOperators() {
        return this.http.get(this.ApiUrl + 'comparison_operators', this.jwt()).map((response: Response) => response.json());
    }

    aggregateOperators() {
        return this.http.get(this.ApiUrl + 'boolean_aggregate_operators', this.jwt()).map((response: Response) => response.json());
    }

}