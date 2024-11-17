import { Module } from '@nestjs/common';
import { RealStatesService } from './real-states.service';
import { RealStatesController } from './real-states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealState } from './entities/real-state.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [RealStatesController],
  providers: [RealStatesService],
  imports: [TypeOrmModule.forFeature([RealState, User])],
})
export class RealStatesModule {}
