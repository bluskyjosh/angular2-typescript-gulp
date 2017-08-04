export class Participant {
    id: number;
    organization_id: number;
    primary_user_id: number;
    email: string;
    username: string;
    identifier: string;
    first_name: string;
    last_name: string;
    logins: number;
    last_login: string;
    password_date: string;
    birth_date: string;
    birth_sex: string;
    language: string;
    race: string;
    cell_phone_number: string;
    sms_opt_in: number;
    created_by_id: number;
    created_at: string;
    updated_at: string;
    status:string;
    active_treatment_cycle_id: number;
}