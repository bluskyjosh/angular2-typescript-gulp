import {SendOffset} from "./send.offset";
import {MessageRecipient} from "./message.recipient";

export class Action {
    id: number;
    organization_id: number;
    parent_id: number;
    description: string;
    event: string;
    action: string;
    message_delivery_type: string;
    message_template_id: number;
    survey_id: number;
    update_machine_name: string;
    update_value: string;
    send_offset: SendOffset;
    expression_id: number;
    weight:number;
    created_at: string;
    updated_at: string;
    to: MessageRecipient [];
    cc: MessageRecipient [];
    bcc: MessageRecipient [];
}