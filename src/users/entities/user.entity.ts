import { Commande } from 'src/commandes/entities/commande.entity';
import { Favoris } from 'src/favoris/entities/favoris.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Role } from '../../role/entities/role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();
  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  lastname: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  firstname: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 20,
  })
  birthday: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 10,
  })
  gender: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  address: string;

  @Column({
    nullable: false,
    type: 'int',
    width: 5,
  })
  departement: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  country: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  town: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 20,
  })
  phone: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  password: string;
  @OneToMany(() => Favoris, (favoris) => favoris.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  favoris: Favoris[];
  @OneToMany(() => Commande, (commande) => commande.user, {
    eager: true,
  })
  commande!: Commande[];
  @OneToMany(() => Rating, (rating) => rating.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  rating: Rating[];
  @ManyToOne(() => Role, (role) => role.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  role: Role;
}
