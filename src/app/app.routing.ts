import { Routes, RouterModule } from '@angular/router';

import {ClassListComponent} from "./classes/index";
import {ClassTemplateListComponent} from "./class_templates/index";
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { MessageTemplateListComponent } from "./message_templates/index";
import { ParticipantListComponent } from './participants/index';
import { NormativeItemListComponent} from "./normative_items/index";
import { NotificationLogListComponent} from "./notification_logs/index";
import { ReportTemplateListComponent} from "./report_templates/index";
import { SurveyTemplateListComponent} from "./survey_templates/index";
import { TreatmentCycleTemplateListComponent} from "./treatment_cycle_templates/index";
import { RegisterComponent } from './register/index';
import { UserListComponent } from './user/index';
import { AuthGuard, NavGuard } from './_guards/index';


const appRoutes: Routes = [
    //Authenticated Routes
    { path: 'classes', component: ClassListComponent, canActivate: [AuthGuard, NavGuard]},
    { path: 'class_templates', component: ClassTemplateListComponent, canActivate: [AuthGuard, NavGuard]},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard, NavGuard] },
    { path: 'message_templates', component: MessageTemplateListComponent, canActivate:[AuthGuard, NavGuard]},
    { path: 'normative_items', component: NormativeItemListComponent, canActivate:[AuthGuard, NavGuard]},
    { path: 'notifications', component: NotificationLogListComponent, canActivate:[AuthGuard, NavGuard]},
    { path: 'participants', component: ParticipantListComponent, canActivate: [AuthGuard, NavGuard]},
    { path: 'users', component: UserListComponent, canActivate: [AuthGuard, NavGuard] },
    { path: 'report_templates', component: ReportTemplateListComponent, canActivate: [AuthGuard, NavGuard]},
    { path: 'survey_templates', component: SurveyTemplateListComponent, canActivate:[AuthGuard, NavGuard]},
    { path: 'treatment_cycle_templates', component: TreatmentCycleTemplateListComponent, canActivate: [AuthGuard, NavGuard]},

    //public routes
    { path: 'login', component: LoginComponent, canActivate: [NavGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NavGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
