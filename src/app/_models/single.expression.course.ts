import {SingleExpression} from "./single.expression";

export class SingleExpressionCourse extends SingleExpression {
    constructor (category?:string) {
        super(category);
        this.left = {course_id: ''};
        this.middle = {status_operator: '', count_operator: ''};
        this.right = {course_status: '', course_count: 0};

    }
}