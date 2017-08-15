import { Component, Input,  Output, EventEmitter } from '@angular/core';

import { Course, SingleExpression, User} from "../../_models/index";

@Component({
    moduleId: module.id,
    selector:'single-expression',
    templateUrl: 'single.expression.component.html',


})

export class SingleExpressionComponent {
    private singleExpression: SingleExpression = new SingleExpression();
    private courses: Course[];
    private providers: User[];
    private extendedProperties: Object[];




    @Input() get Courses() {
        return this.courses;
    }
    set Courses(courses:Course[]) {
        this.courses = courses;
    }

    @Input() get Providers() {
        return this.providers;
    }
    set Providers(providers: User[]) {
        this.providers = providers;
    }

    @Input() get ExtendedProperties() {
        return this.extendedProperties;
    }
    set ExtendedProperties(extendedProperties:Object[]) {
        this.extendedProperties = extendedProperties;
    }

    @Input() get SingleExpression() {
        return this.singleExpression;
    }
    set SingleExpression(singleExpression: SingleExpression) {
        this.singleExpression = singleExpression;
    }

    categories = [
        {machine_name:'course', display_name:'Course'},
        {machine_name:'class', display_name:'Class'},
        {machine_name:'participant', display_name:'Participant'}
    ];

    selectedCategory:string = "";

    constructor() { };



    clear(expression: SingleExpression) {
        expression.left = new Object();
        expression.middle = new Object();
        expression.right = new Object();

    }

}