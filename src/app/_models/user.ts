
import {Role} from "./role";
import {Privilege} from "./privilege";
export class User {
    id: number;
    organization_id: number;
    role_id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    logins: number;
    last_login:string;
    password_date:string;
    superuser:boolean;
    flag_color:string;
    created_by_id:number;
    created_at:string;
    updated_at:string;
    password_expiration_date:string;
    roles:Role[];
    privileges:Privilege[];
    referral_codes:string[];
}