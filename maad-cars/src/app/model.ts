import { Make } from "./make";

export interface Model {
    id: number;
    name: string;
    make_id: Make;
}