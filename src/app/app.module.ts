import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SidebarModule } from 'ng-sidebar';
import { DataTableModule } from 'angular-4-data-table';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard, NavGuard } from './_guards/index';
import {AlertService,
    AuthenticationService,
    ClassService,
    ClassTemplateService,
    MessageTemplateService,
    ParticipantService,
    SurveyTemplateService,
    NavigatorService,
    UserService
    } from './_services/index';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {UserListComponent} from './user/index';
import {ClassListComponent} from "./classes/index";
import {ClassTemplateListComponent} from "./class_templates/index";
import {ParticipantListComponent} from "./participants/index";
import {MessageTemplateListComponent} from "./message_templates/index";
import {SurveyTemplateListComponent} from "./survey_templates/index";





@NgModule({
    imports: [
        BrowserModule,
        DataTableModule,
        FormsModule,
        HttpModule,
        SidebarModule.forRoot(),
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        ClassListComponent,
        ClassTemplateListComponent,
        HomeComponent,
        LoginComponent,
        MessageTemplateListComponent,
        ParticipantListComponent,
        SurveyTemplateListComponent,
        RegisterComponent,
        UserListComponent
    ],
    providers: [
        AuthGuard,
        NavGuard,
        AlertService,
        AuthenticationService,
        ClassService,
        ClassTemplateService,
        MessageTemplateService,
        ParticipantService,
        SurveyTemplateService,
        NavigatorService,
        UserService,


        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}