import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column({
    nullable: true,
    type: 'varchar',
    length: 20,
  })
  role: string;
  @OneToMany(() => User, (user) => user.role, {})
  user!: User;
}
