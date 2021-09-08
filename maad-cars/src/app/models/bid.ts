import { Time } from "@angular/common";
import { Sale } from "./sale";
import { User } from "./user";

export interface Bid{
    bid_id:number;
    bid_amount:number;
    time_stamp:Time;
    sale_id:Sale;
    user_id:User;
}
