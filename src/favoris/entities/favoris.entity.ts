import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Favoris {
  @PrimaryGeneratedColumn()
  id?: string;
  @ManyToOne(() => User, (user) => user.favoris, {})
  user!: User;
  @ManyToOne(() => Product, (product) => product.favoris, {
    eager: true,
  })
  product!: Product;
}
