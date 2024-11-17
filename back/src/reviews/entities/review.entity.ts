import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { RealState } from 'src/real-states/entities/real-state.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  reviewId: string;

  @ManyToOne(() => RealState, (realState) => realState.realStateId)
  realStateId: RealState;

  @ManyToOne(() => User, (user) => user.userId)
  userId: User;

  @Column('int')
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  createdAt: Date;
}
