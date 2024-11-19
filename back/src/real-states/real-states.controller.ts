import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateRealStateDto } from './dto/create-real-state.dto';
import { UpdateRealStateDto } from './dto/update-real-state.dto';

import { RealStatesService } from './real-states.service';
import { LoggedInGuard } from 'src/guards/loggedIn';
import { TokenGuard } from 'src/guards/token';

@Controller('real-states')
export class RealStatesController {
  constructor(private readonly realStatesService: RealStatesService) {}

  @Post()
  create(@Body() createRealStateDto: CreateRealStateDto) {
    return this.realStatesService.create(createRealStateDto);
  }

  @UseGuards(LoggedInGuard)
  @Get()
  findAll() {
    return this.realStatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.realStatesService.findOne(id);
  }

  @UseGuards(TokenGuard)
  @Get('owner/:id')
  findOwnerRealStates(@Param('id') id: string) {
    return this.realStatesService.findOwnerRealStates(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealStateDto: UpdateRealStateDto,
  ) {
    return this.realStatesService.update(id, updateRealStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realStatesService.remove(id);
  }
}
