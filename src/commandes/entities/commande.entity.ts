import { MailTo } from 'src/mail-to/entities/mail-to.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { User } from 'src/users/entities/user.entity';
import { ProduitsCommande } from '../../produits-commande/entities/produits-commande.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Commande {
  //  Mise en place des differentes colonne et de leur typage
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 150,
    unique: true,
  })
  orderNumber: string;
  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  lastnameDelivery: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  firstnameDelivery: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  date!: Date;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  addressDelivery: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 5,
  })
  departementDelivery: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  countryDelivery: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  townDelivery: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 20,
  })
  phoneDelivery: string;
  @Column({
    nullable: false,
    type: 'boolean',
  })
  send: boolean;
  // Mise en place des jointures avec les differents tables
  @ManyToOne(() => User, (user) => user.commande, {
    eager: false,
  })
  user!: User;
  @OneToMany(
    () => ProduitsCommande,
    (produitCommande) => produitCommande.commande,
    {
      eager: true,
    },
  )
  produitsCommande!: ProduitsCommande;
  @OneToMany(() => MailTo, (mailTo) => mailTo.commande, { eager: true })
  mailTo!: MailTo[];
}
