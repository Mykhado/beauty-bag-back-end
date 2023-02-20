import { Test, TestingModule } from '@nestjs/testing';
import { StatutProductService } from './statut-product.service';

describe('StatutProductService', () => {
  let service: StatutProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatutProductService],
    }).compile();

    service = module.get<StatutProductService>(StatutProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
