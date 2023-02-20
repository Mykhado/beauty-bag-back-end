import { Category } from 'src/category/entities/category.entity';
import { Favoris } from 'src/favoris/entities/favoris.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { ProduitsCommande } from '../../produits-commande/entities/produits-commande.entity';
import { StatutProduct } from '../../statut-product/entities/statut-product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column({
    nullable: false,
    type: 'varchar',
    length: 150,
  })
  name: string;
  @Column({
    nullable: false,
    type: 'decimal',
    width: 10,
  })
  unitPrice: number;

  @Column({
    nullable: true,
    type: 'int',
    width: 10,
  })
  quantityGlobal: number;
  @Column({
    nullable: true,
    type: 'int',
    width: 1,
  })
  rateGlobal: number;

  @OneToMany(() => Favoris, (favoris) => favoris.product, {
    eager: false,
  })
  favoris!: Favoris[];
  @OneToMany(() => Panier, (panier) => panier.product, {
    eager: false,
  })
  panier!: Panier[];

  @OneToMany(() => Rating, (rating) => rating.product, {
    eager: false,
  })
  rating!: Rating[];
  @ManyToOne(() => Category, (category) => category.product, {
    eager: true,
  })
  category!: Category;

  @ManyToOne(() => StatutProduct, (statut) => statut.product, {
    eager: true,
  })
  statut!: StatutProduct;
  @OneToMany(
    () => ProduitsCommande,
    (produitsCommande) => produitsCommande.product,
    {
      eager: false,
    },
  )
  produitsCommande!: ProduitsCommande[];
}
