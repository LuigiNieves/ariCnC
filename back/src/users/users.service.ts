import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...user } = createUserDto;

      const newUser = this.userRepository.create({
        password: bcryptjs.hashSync(password),
        ...user,
      });

      const { password: _, ...created } =
        await this.userRepository.save(newUser);
      console.log(user);
      return {
        ...created,
        token: await this.getToken({ password, ...created }),
      };
    } catch (error) {
      if ((error.code = '23505')) {
        console.log(error);
        throw new BadRequestException(`${createUserDto.username} ya existe!!`);
      }
      throw new InternalServerErrorException('Algo salió mal!!');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    const user = await this.userRepository.findOneBy({ username });

    if (!user || this.isNotValid(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials');
    }

    const { password: _, ...rest } = user;

    return {
      ...rest,
      token: await this.getToken(user),
    };
  }

  private isNotValid(password: string, encripted: string) {
    return !bcryptjs.compareSync(password, encripted);
  }

  private async getToken(user: User): Promise<string> {
    const { password, ...userPayload } = user;
    return this.jwtService.sign(userPayload);
  }

  authenticate(token: string) {
    return this.jwtService.decode(token);
  }
}
