import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Equal, Repository } from 'typeorm';
import { create } from 'domain';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRespository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { realStateId, userId, ...rest } = createBookingDto;
    return await this.bookingRespository.save({
      ...rest,
      userId: {
        userId,
      },
      realStateId: {
        realStateId,
      },
    });
  }

  findOne(userId: string) {
    return this.bookingRespository.find({
      where: {
        userId: Equal(userId),
      },
      relations: ['realStateId'],
    });
  }

  update(id: string, rating: number) {
    return this.bookingRespository.update(id, {
      rating,
    });
  }
}
