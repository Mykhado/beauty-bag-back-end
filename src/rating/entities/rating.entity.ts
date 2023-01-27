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
export class Rating {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: true,
    type: 'int',
    width: 1,
  })
  rate: number;
  @ManyToOne(() => User, (user) => user.rating, {})
  user!: User;
  @ManyToOne(() => Product, (product) => product.rating, {
    eager: false,
  })
  product!: Product;
}
