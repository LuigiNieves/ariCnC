import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealState } from './entities/real-state.entity';
import { CreateRealStateDto } from './dto/create-real-state.dto';
import { User } from 'src/users/entities/user.entity';
// DTO que contiene los datos del nuevo RealState

@Injectable()
export class RealStatesService {
  constructor(
    @InjectRepository(RealState)
    private readonly realStateRepository: Repository<RealState>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Repositorio para manejar usuarios
  ) {}

  async create(createRealStateDto: CreateRealStateDto) {
    const { userId, ...realStateData } = createRealStateDto;

    const newRealState = this.realStateRepository.create({
      ...realStateData,
      userId: { userId },
    });

    return this.realStateRepository.save(newRealState);
  }

  async findAll() {
    return await this.realStateRepository.find();
  }

  async findOwnerRealStates(userId: string) {
    return await this.userRepository
      .findOne({
        where: { userId },
        relations: ['realStates'], // Nombre de la relación definida en la entidad User
      })
      .then((user) => user.realStates);
  }
}
