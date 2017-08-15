import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { Course, SingleExpression} from "../../_models/index";

const noop = () => { };
@Component({
    moduleId: module.id,
    selector:'course-expression',
    templateUrl: 'course.expression.component.html',

    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting:forwardRef(() => CourseExpressionComponent), multi:true }
    ]
})

export class CourseExpressionComponent {
    @Input() Courses: Course[];

    private singleExpression: SingleExpression;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    get value(): SingleExpression {
        return this.singleExpression;
    };

    set value(v: SingleExpression) {
        if (v !== this.singleExpression) {
            this.singleExpression = v;
            this.onChangeCallback(v);
        }
    }

    onBlur() {
        this.onTouchedCallback();
    }

    writeValue(value: SingleExpression) {
        if (value !== this.singleExpression) {
            this.singleExpression = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


    equality_operators = ['=', '≠'];
    comparison_operators = ['=', '≠', '<', '>', '<=', '>='];
    statuses = [ {machine_name:'not_registered', display_name:'Not Registered'},
        {machine_name:'registered', display_name:'Registered'},
        {machine_name:'completed', display_name:'Completed'},
        {machine_name:'absent', display_name:'Absent'}];

}