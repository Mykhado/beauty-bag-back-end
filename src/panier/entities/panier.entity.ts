import { Commande } from 'src/commandes/entities/commande.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  quantity: number;

  @ManyToOne(() => User, (user) => user.panier, {
    eager: false,
  })
  user!: User;
  @ManyToOne(() => Product, (product) => product.panier, {
    eager: true,
  })
  product!: Product;
}
