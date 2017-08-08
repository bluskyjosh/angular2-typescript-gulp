import {NormativeItem} from "./index";

export class NormativeItemBatch {
    id:number;
    organization_id:number;
    active: boolean;
    created_at:string;
    updated_at:string;
    deleted_at:string;
    normative_items: NormativeItem[];
}