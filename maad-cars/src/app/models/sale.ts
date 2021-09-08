import { Time } from "@angular/common";
import { Vehicle } from "./vehicle";

export interface sale{
    sale_id: number;
    vehicle: Vehicle;
    time_started: Time;
}