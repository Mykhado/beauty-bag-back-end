import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { Favoris } from './entities/favoris.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Favoris])],
  controllers: [FavorisController],
  providers: [FavorisService],
})
export class FavorisModule {}
