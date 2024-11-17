import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { RealState } from 'src/real-states/entities/real-state.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  bookingId: string;

  @ManyToOne(() => RealState, (realState) => realState.realStateId)
  realStateId: RealState;

  @ManyToOne(() => User, (user) => user.userId)
  userId: User;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column('decimal')
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}
