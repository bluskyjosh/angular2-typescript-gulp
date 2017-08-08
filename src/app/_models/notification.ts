export class Notification {
    id: number;
    organization_id: number;
    user_id:number;
    notification_type:string;
    send_method_type:string;
    message_template_id:string;
    to:string;
    bcc:string;
    cc:string;
    subject:string;
    body:string;
    referral_code_id:number;
    class_id:number;
    acting_survey_id:number;
    invite_survey_id:number;
    survey_session_id:number;
    code:string;
    sent_date:string;
    resent_date:string;
    resent_to:string;
    created_at:string;
    updated_at:string;
}