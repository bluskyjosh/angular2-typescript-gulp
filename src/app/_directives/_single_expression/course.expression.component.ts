import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Course, SingleExpression} from "../../_models/index";
import {BaseExpression} from "./base.expression";
@Component({
    moduleId: module.id,
    selector:'course-expression',
    templateUrl: 'course.expression.component.html'
})

export class CourseExpressionComponent extends BaseExpression {

    private courses: Course[];

    @Input() get Courses() {
        return this.courses;
    }
    set Courses(courses:Course[]) {
        this.courses = courses;
    }
    ngOnInit() {
        this.SingleExpression.middle.count_operator = '';
        this.SingleExpression.right.course_count = 0;
    }

}