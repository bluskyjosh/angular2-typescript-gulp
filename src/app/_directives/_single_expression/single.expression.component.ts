import { Component, forwardRef, Input,  Output, EventEmitter } from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import { Course, SingleExpression, User} from "../../_models/index";

const noop = () => { };
@Component({
    moduleId: module.id,
    selector:'single-expression',
    templateUrl: 'single.expression.component.html',

    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SingleExpressionComponent), multi:true }
    ]
})

export class SingleExpressionComponent {
    @Input() Courses: Course[];
    @Input() Providers: User[];
    @Input() ExtendedProperties: Object[];


    categories = [
        {machine_name:'course', display_name:'Course'},
        {machine_name:'class', display_name:'Class'},
        {machine_name:'participant', display_name:'Participant'}
    ];

    selectedCategory:string = "";

    private singleExpression: SingleExpression;

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
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



    clear(expression: SingleExpression) {
        expression.left = new Object();
        expression.middle = new Object();
        expression.right = new Object();

    }

}