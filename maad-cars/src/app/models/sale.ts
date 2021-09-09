import { Time } from "@angular/common";
import { Vehicle } from "./vehicle";

export interface Sale {
    sale_id: number;
    vehicle: Vehicle;
    time_started: Time;
}
