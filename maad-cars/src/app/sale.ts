import { Time } from "@angular/common";
import { Vehicle } from "./vehicle";

export interface Sale {
    id: number;
    vehicle_id: Vehicle;
    time_started: Time;
}