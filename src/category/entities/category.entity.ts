import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column({
    nullable: false,
    type: 'varchar',
    length: 150,
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category, {
    eager: false,
  })
  product!: Product;
}
