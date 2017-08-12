import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SidebarModule } from 'ng-sidebar';
import { DropdownModule } from 'ng2-dropdown';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';
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
    NormativeItemService,
    NormativeItemBatchService,
    NormativeItemCategoryService,
    NotificationService,
    OrganizationService,
    OrganizationIpRuleService,
    ParticipantService,
    SurveyTemplateService,
    ReportTemplateService,
    TreatmentCycleTemplateService,
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
import {NormativeItemListComponent} from "./normative_items/index";
import {NotificationLogListComponent} from "./notification_logs/index";
import {OrganizationComponent, OrganizationSettingsComponent, OrganizationSecurityComponent} from "./organization/index";
import {ReportTemplateListComponent} from "./report_templates/index";
import {SurveyTemplateListComponent} from "./survey_templates/index";
import {TreatmentCycleTemplateListComponent} from "./treatment_cycle_templates/index";






@NgModule({
    imports: [
        BrowserModule,
        DataTableModule,
        FormsModule,
        HttpModule,
        InlineEditorModule,
        SidebarModule.forRoot(),
        DropdownModule,
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
        NormativeItemListComponent,
        NotificationLogListComponent,
        OrganizationComponent,
        OrganizationSettingsComponent,
        OrganizationSecurityComponent,
        ParticipantListComponent,
        ReportTemplateListComponent,
        SurveyTemplateListComponent,
        TreatmentCycleTemplateListComponent,
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
        NormativeItemService,
        NormativeItemBatchService,
        NormativeItemCategoryService,
        NotificationService,
        OrganizationService,
        OrganizationIpRuleService,
        ParticipantService,
        ReportTemplateService,
        SurveyTemplateService,
        TreatmentCycleTemplateService,
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