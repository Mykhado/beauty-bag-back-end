import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rating]), AuthModule],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
