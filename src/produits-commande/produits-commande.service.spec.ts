import { Test, TestingModule } from '@nestjs/testing';
import { ProduitsCommandeService } from './produits-commande.service';

describe('ProduitsCommandeService', () => {
  let service: ProduitsCommandeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduitsCommandeService],
    }).compile();

    service = module.get<ProduitsCommandeService>(ProduitsCommandeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
