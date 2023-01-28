import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { Panier } from './entities/panier.entity';

@Injectable()
export class PanierService {
  constructor(
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
  ) {}
  async create(createPanierDto: CreatePanierDto): Promise<Panier> {
    return await this.panierRepository.save(createPanierDto);
  }

  async findAll(): Promise<Panier[]> {
    return await this.panierRepository.find();
  }

  async findOne(id: string): Promise<Panier> {
    const panierFound = await this.panierRepository.findOneBy({ id: id });
    if (!panierFound) {
      throw new NotFoundException(`Pas de rôles avec l'id: ${id}`);
    }
    return panierFound;
  }

  async update(id: string, updatePanierDto: UpdatePanierDto): Promise<Panier> {
    const updatepanier = await this.findOne(id);
    if (updatepanier.quantity !== undefined) {
      updatepanier.quantity = updatePanierDto.quantity;
    }

    return await this.panierRepository.save(updatepanier);
  }

  async remove(id: string) {
    const result = await this.panierRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de panier avec l'id: ${id}`);
    }
    return `le panierà l'id: ${id} a été supprimée!`;
  }
}
