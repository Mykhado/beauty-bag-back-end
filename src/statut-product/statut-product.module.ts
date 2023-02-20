import { Module } from '@nestjs/common';
import { StatutProductService } from './statut-product.service';
import { StatutProductController } from './statut-product.controller';
import { AuthModule } from 'src/auth/auth.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StatutProduct } from './entities/statut-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatutProduct]), AuthModule],
  controllers: [StatutProductController],
  providers: [StatutProductService],
})
export class StatutProductModule {}
