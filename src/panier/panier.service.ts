import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { Panier } from './entities/panier.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createPanierDto: CreatePanierDto,
    users: User,
  ): Promise<Panier[]> {
    const user = {
      id: users.id,
    };
    const queryAllPanier = this.panierRepository.createQueryBuilder();
    queryAllPanier.where({ user: users });
    const newPanier = { ...createPanierDto, user };
    console.log('newPanier', newPanier);
    await this.panierRepository.save(newPanier);
    // affichage de tout le panier en return afin de pouvoir effectuer l affichage de celui-ci en dynamique dans le front
    return queryAllPanier.getMany();
  }

  async findAll(users: User): Promise<Panier[]> {
    const queryAllPanier = this.panierRepository.createQueryBuilder();
    queryAllPanier.where({ user: users });
    return queryAllPanier.getMany();
  }

  async findOne(id: string, users: User): Promise<Panier> {
    const queryPanierById = await this.panierRepository.createQueryBuilder();
    queryPanierById.where({ id: id }).andWhere({ user: users });
    const found = await queryPanierById.getOne();
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Pas de panier avec l'id: ${id}`);
    } else {
      return found;
    }
  }

  async update(
    id: string,
    updatePanierDto: UpdatePanierDto,
    user: User,
  ): Promise<Panier> {
    const updatepanier = await this.findOne(id, user);
    if (updatepanier.quantity !== undefined) {
      updatepanier.quantity = updatePanierDto.quantity;
    }

    return await this.panierRepository.save(updatepanier);
  }

  async remove(id: string, users: User) {
    const queryDeletePanierById =
      await this.panierRepository.createQueryBuilder();
    queryDeletePanierById.where({ id: id }).andWhere({ user: users });
    const queryAllPanierUser = this.panierRepository.createQueryBuilder();
    queryAllPanierUser.where({ user: users });
    const found = await queryDeletePanierById.getOne();
    if (!found) {
      throw new NotFoundException(`Pas de panier avec l'id: ${id}`);
    } else {
      await this.panierRepository.delete(+id);
      return queryAllPanierUser.getMany();
    }
  }
}
