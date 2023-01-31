import { Test, TestingModule } from '@nestjs/testing';
import { ProduitsCommandeController } from './produits-commande.controller';
import { ProduitsCommandeService } from './produits-commande.service';

describe('ProduitsCommandeController', () => {
  let controller: ProduitsCommandeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProduitsCommandeController],
      providers: [ProduitsCommandeService],
    }).compile();

    controller = module.get<ProduitsCommandeController>(
      ProduitsCommandeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
