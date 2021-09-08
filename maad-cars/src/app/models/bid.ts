import { Time } from "@angular/common";
import { Sale } from "../sale";
import { User } from "./user";

export interface bid{
    bid_id:number;
    bid_amount:number;
    time_stamp:Time;
    sale:Sale;
    user:User;
}