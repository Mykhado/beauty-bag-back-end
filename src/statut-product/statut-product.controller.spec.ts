import { Test, TestingModule } from '@nestjs/testing';
import { StatutProductController } from './statut-product.controller';
import { StatutProductService } from './statut-product.service';

describe('StatutProductController', () => {
  let controller: StatutProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatutProductController],
      providers: [StatutProductService],
    }).compile();

    controller = module.get<StatutProductController>(StatutProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
