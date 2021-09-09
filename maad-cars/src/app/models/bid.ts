import { Sale } from "./sale";
import { User } from "./user";

export interface Bid{
    bid_id:number;
    bid:number;
    time:string;
    sale:Sale;
    user:User;
}
