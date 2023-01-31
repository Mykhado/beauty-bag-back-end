import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateFavorisDto } from './dto/create-favoris.dto';
import { UpdateFavorisDto } from './dto/update-favoris.dto';
import { Favoris } from './entities/favoris.entity';

@Injectable()
export class FavorisService {
  constructor(
    @InjectRepository(Favoris)
    private favorisRepository: Repository<Favoris>,
  ) {}
  async create(
    createFavorisDto: CreateFavorisDto,
    users: User,
  ): Promise<Favoris> {
    const user = {
      id: users.id,
    };

    const newfavoris = { ...createFavorisDto, user };
    console.log('newPanier', newfavoris);
    return await this.favorisRepository.save(newfavoris);
  }

  async findAll(users: User): Promise<Favoris[]> {
    const queryAllFavoris = this.favorisRepository.createQueryBuilder();
    queryAllFavoris.where({ user: users });
    return queryAllFavoris.getMany();
  }

  async findOne(id: string, users: User): Promise<Favoris> {
    const queryFavorisById = await this.favorisRepository.createQueryBuilder();
    queryFavorisById.where({ id: id }).andWhere({ user: users });
    const found = await queryFavorisById.getOne();
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Pas de favoris avec l'id: ${id}`);
    } else {
      return found;
    }
  }

  // async update(id: number, updateFavorisDto: UpdateFavorisDto, users: User) {
  //   const queryUpdateFavoris = this.favorisRepository.createQueryBuilder();
  //   queryUpdateFavoris.where({ id: id }).andWhere({ user: users });
  // }

  async remove(id: string, users: User): Promise<string> {
    const queryDeleteFavorisById =
      await this.favorisRepository.createQueryBuilder();
    queryDeleteFavorisById.where({ id: id }).andWhere({ users: users });
    const found = await queryDeleteFavorisById.getOne();
    if (!found) {
      throw new NotFoundException(`Pas de favoris avec l'id: ${id}`);
    } else {
      await this.favorisRepository.delete(+id);
      return `favoris avec l'id: ${id} supprimé`;
    }
  }
}
