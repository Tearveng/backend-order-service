import { CartsEntity } from '../Carts';
import { UserDTO } from './UserDTO';

export interface CartDTO extends Omit<CartsEntity, 'userId'> {
  user: UserDTO;
}
