import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}
  async create(createRatingDto: CreateRatingDto, users: User): Promise<Rating> {
    const user = {
      id: users.id,
    };

    const newRating = { ...createRatingDto, user };
    console.log('newRating', newRating);
    return await this.ratingRepository.save(newRating);
  }

  async findAll(users: User): Promise<Rating[]> {
    const queryAllRating = this.ratingRepository.createQueryBuilder();
    queryAllRating.where({ user: users });
    return queryAllRating.getMany();
  }

  async findOne(id: string, users: User): Promise<Rating> {
    const queryRatingById = await this.ratingRepository.createQueryBuilder();
    queryRatingById.where({ id: id }).andWhere({ user: users });
    const found = await queryRatingById.getOne();
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Pas rate avec l'id: ${id}`);
    } else {
      return found;
    }
  }

  async update(
    id: string,
    updateRatingDto: UpdateRatingDto,
    users: User,
  ): Promise<Rating> {
    const queryUpdateRating = this.ratingRepository.createQueryBuilder();
    queryUpdateRating.where({ id: id }).andWhere({ user: users });
    const patch = await queryUpdateRating.getOne();
    console.log(!patch);
    if (!queryUpdateRating) {
      throw new NotFoundException(`Pas de rate modifiable avec l'id: ${id}`);
    }
    const updateRating = await this.findOne(id, users);
    if (updateRating.rate !== undefined) {
      updateRating.rate = updateRatingDto.rate;
    }

    return await this.ratingRepository.save(updateRating);
  }

  async remove(id: string, users: User): Promise<string> {
    const queryDeleteRatingById =
      await this.ratingRepository.createQueryBuilder();
    queryDeleteRatingById.where({ id: id }).andWhere({ user: users });
    const found = await queryDeleteRatingById.getOne();
    if (!found) {
      throw new NotFoundException(`Pas de rate avec l'id: ${id}`);
    } else {
      await this.ratingRepository.delete(+id);
      return `rate avec l'id: ${id} supprimé`;
    }
  }
}
