import { Product } from 'src/products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
export class CreateFavorisDto {
  user: User;
  product: Product;
}
