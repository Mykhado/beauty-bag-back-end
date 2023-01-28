import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}
  async create(createRatingDto: CreateRatingDto) {
    return await this.ratingRepository.save(createRatingDto);
  }

  async findAll() {
    return await this.ratingRepository.find();
  }

  async findOne(id: string) {
    const ratingFound = await this.ratingRepository.findOneBy({ id: id });
    if (!ratingFound) {
      throw new NotFoundException(`Pas de rating avec l'id: ${id}`);
    }
    return ratingFound;
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const updateRating = await this.findOne(id);
    if (updateRating.rate !== undefined) {
      updateRating.rate = updateRatingDto.rate;
    }

    return await this.ratingRepository.save(updateRating);
  }

  async remove(id: string) {
    const result = await this.ratingRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de rating avec l'id: ${id}`);
    }
    return `le rating à l'id: ${id} a été supprimée!`;
  }
}
