import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateRatingDto {
  rate: number;
  product: Product;
  user: User;
}
