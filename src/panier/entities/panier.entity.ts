import { Commande } from 'src/commandes/entities/commande.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
@Entity()
export class Panier {
  @PrimaryGeneratedColumn()
  id?: string;
  rateGlobal: number;
  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  quantity: number;

  @ManyToOne(() => Commande, (commande) => commande.panier, {})
  commande!: Commande;
  @ManyToOne(() => Product, (product) => product.panier, {
    eager: false,
  })
  product!: Product[];
}
