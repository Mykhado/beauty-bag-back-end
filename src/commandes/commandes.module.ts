import { Module } from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { Commande } from './entities/commande.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Panier } from '../panier/entities/panier.entity';
import { ProduitsCommande } from '../produits-commande/entities/produits-commande.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [
    // imports des different modules que nous pourrons injecter dans notre service par la suite pour utilisation
    TypeOrmModule.forFeature([Commande, Panier, ProduitsCommande, Product]),
    AuthModule,
  ],
  controllers: [CommandesController],
  providers: [CommandesService],
})
export class CommandesModule {}
