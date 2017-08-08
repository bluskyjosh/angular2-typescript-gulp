import {User, SurveyTemplate} from "./index";



export class TreatmentCycleTemplate {
    id: number;
    organization_id: number;
    referral_code: string;
    description: string;
    duration: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    users: User[];
    surveys: SurveyTemplate[];
}