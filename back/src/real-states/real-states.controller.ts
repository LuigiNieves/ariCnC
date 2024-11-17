import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateRealStateDto } from './dto/create-real-state.dto';
import { UpdateRealStateDto } from './dto/update-real-state.dto';

import { RealStatesService } from './real-states.service';

@Controller('real-states')
export class RealStatesController {
  constructor(private readonly realStatesService: RealStatesService) {}

  @Post()
  create(@Body() createRealStateDto: CreateRealStateDto) {
    return this.realStatesService.create(createRealStateDto);
  }

  @Get()
  findAll() {
    return this.realStatesService.findAll();
  }

  @Get('owner/:id')
  findOwnerRealStates(@Param('id') id: string) {
    return this.realStatesService.findOwnerRealStates(id);
  }


}
