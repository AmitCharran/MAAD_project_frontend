import { User } from './user';
import { Model } from './model';

export interface Vehicle {
  vehicle_id: number;
  user: User;
  model: Model;
  vin: string;
  color: string;
  _stolen: boolean;
  description: string;
}
