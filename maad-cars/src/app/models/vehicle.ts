import { User } from './user';
import { Model } from './model';

export interface Vehicle {
  vehicle_id: number;
  user: User;
  model: Model;
  vin: string;
  color: string;
  is_stolen: boolean;
  description: string;
}
