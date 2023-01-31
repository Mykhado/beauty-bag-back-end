import { Module } from '@nestjs/common';
import { FavorisService } from './favoris.service';
import { FavorisController } from './favoris.controller';
import { Favoris } from './entities/favoris.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favoris]), AuthModule],
  controllers: [FavorisController],
  providers: [FavorisService],
})
export class FavorisModule {}
