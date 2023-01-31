import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
export class CreatePanierDto {
  quantity: number;
  product: Product;
  user: User;
}
