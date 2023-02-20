import { Commande } from 'src/commandes/entities/commande.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { time } from 'console';
@Entity()
export class ProduitsCommande {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 10,
  })
  quantity: number;

  @ManyToOne(() => Commande, (commande) => commande.produitsCommande, {
    onDelete: 'CASCADE',
  })
  commande!: Commande;

  @ManyToOne(() => Product, (product) => product.produitsCommande, {
    eager: true,
    onDelete: 'CASCADE',
  })
  product!: Product;
}
