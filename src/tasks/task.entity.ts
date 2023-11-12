import { User } from 'src/users';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  date_time: string;

  @ManyToOne(() => User, user => user.tasks)
  owner: User;

  @Column()
  ownerId: number;
}
