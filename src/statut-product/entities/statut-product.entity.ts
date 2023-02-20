import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class StatutProduct {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column({
    nullable: false,
    type: 'varchar',
    length: 150,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.statut, {
    eager: false,
  })
  product!: Product;
}
