import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

@Entity('real-states')
export class RealState {
  @PrimaryGeneratedColumn('uuid')
  realStateId: string;

  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column('decimal')
  pricePerNight: number;

  @Column()
  numBedrooms: number;

  @Column()
  numBathrooms: number;

  @Column()
  maxGuests: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
