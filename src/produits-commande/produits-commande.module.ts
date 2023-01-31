import { Module } from '@nestjs/common';
import { ProduitsCommandeService } from './produits-commande.service';
import { ProduitsCommandeController } from './produits-commande.controller';
import { ProduitsCommande } from './entities/produits-commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panier } from 'src/panier/entities/panier.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Commande } from 'src/commandes/entities/commande.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProduitsCommande, Panier, Commande]),
    AuthModule,
  ],
  controllers: [ProduitsCommandeController],
  providers: [ProduitsCommandeService],
})
export class ProduitsCommandeModule {}
