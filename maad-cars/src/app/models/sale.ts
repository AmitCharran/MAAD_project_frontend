import { Time } from "@angular/common";
import { Vehicle } from "./vehicle";

export interface sale{
    sale_id: number;
    vehicle_id: Vehicle;
    time_started: Time;
}
