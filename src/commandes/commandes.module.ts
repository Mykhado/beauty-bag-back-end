import { Module } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { Commande } from './entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Panier } from '../panier/entities/panier.entity';
import { ProduitsCommande } from '../produits-commande/entities/produits-commande.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande, Panier, ProduitsCommande]),
    AuthModule,
  ],
  controllers: [CommandesController],
  providers: [CommandesService],
})
export class CommandesModule {}
