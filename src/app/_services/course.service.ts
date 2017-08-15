import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Course } from '../_models/index';
import {ApiService} from "./api.service";

@Injectable()
export class CourseService extends ApiService {

    getAll() {
        return this.http.get(this.ApiUrl + 'courses', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.ApiUrl + 'courses/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(course: Course) {
        return this.http.post(this.ApiUrl + 'courses', course, this.jwt()).map((response: Response) => response.json());
    }

    update(course: Course) {
        return this.http.put(this.ApiUrl + 'courses/' + course.id, course, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete(this.ApiUrl + 'courses/' + id, this.jwt()).map((response: Response) => response.json());
    }

}