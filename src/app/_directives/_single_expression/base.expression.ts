import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {SingleExpression} from "../../_models/index";

export class BaseExpression {
    private singleExpression: SingleExpression;

    @Input() get SingleExpression () {
        return this.singleExpression;
    }

    set SingleExpression(singleExpression: any) {
        this.singleExpression = singleExpression;
    }

    equality_operators = ['=', '≠'];
    comparison_operators = ['=', '≠', '<', '>', '<=', '>='];
    statuses = [ {machine_name:'not_registered', display_name:'Not Registered'},
        {machine_name:'registered', display_name:'Registered'},
        {machine_name:'completed', display_name:'Completed'},
        {machine_name:'absent', display_name:'Absent'}];
}