import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    TypeOrmModule.forFeature([User]),

    JwtModule.register({
      global: true,
      secret: 'juega en la jfdkf',
      signOptions: { expiresIn: '1h' },
    }),
  ]
})
export class UsersModule {}
