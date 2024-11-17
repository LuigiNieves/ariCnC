import { Test, TestingModule } from '@nestjs/testing';
import { RealStatesController } from './real-states.controller';
import { RealStatesService } from './real-states.service';

describe('RealStatesController', () => {
  let controller: RealStatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealStatesController],
      providers: [RealStatesService],
    }).compile();

    controller = module.get<RealStatesController>(RealStatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
