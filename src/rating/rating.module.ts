import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { Rating } from './entities/rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
