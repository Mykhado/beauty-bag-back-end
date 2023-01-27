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

  @ManyToOne(() => Commande, (commande) => commande.mailTo, {
    eager: true,
  })
  commande!: Commande[];
}
