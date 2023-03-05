import { Commande } from 'src/commandes/entities/commande.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class MailTo {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column({
    nullable: false,
    type: 'text',
  })
  message: string;
  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  email: string;

  @ManyToOne(() => Commande, (commande) => commande.mailTo, {
    eager: true,
    onDelete: 'CASCADE',
  })
  commande!: Commande;
}
