import { RealState } from 'src/real-states/entities/real-state.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn('uuid')
  photoId: string;

  @ManyToOne(() => RealState, (realState) => realState.realStateId)
  realStateId: RealState;


  @Column()
  photoUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
