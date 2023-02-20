import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatutProductDto } from './dto/create-statut-product.dto';
import { UpdateStatutProductDto } from './dto/update-statut-product.dto';
import { StatutProduct } from './entities/statut-product.entity';

@Injectable()
export class StatutProductService {
  constructor(
    @InjectRepository(StatutProduct)
    private statutProductRepository: Repository<StatutProduct>,
  ) {}
  async create(
    createStatutProductDto: CreateStatutProductDto,
  ): Promise<StatutProduct> {
    return await this.statutProductRepository.save(createStatutProductDto);
  }

  async findAll(): Promise<StatutProduct[]> {
    return await this.statutProductRepository.find();
  }

  async findOne(id: string): Promise<StatutProduct> {
    const statutProductFound = await this.statutProductRepository.findOneBy({
      id: id,
    });
    if (!statutProductFound) {
      throw new NotFoundException(`Pas de statut avec l'id: ${id}`);
    }
    return statutProductFound;
  }

  async update(
    id: string,
    updateStatutProductDto: UpdateStatutProductDto,
  ): Promise<StatutProduct> {
    const updateStatutProduct = await this.findOne(id);
    if (updateStatutProduct.name !== undefined) {
      updateStatutProduct.name = updateStatutProductDto.name;
    }

    return await this.statutProductRepository.save(updateStatutProduct);
  }

  async remove(id: string) {
    const result = await this.statutProductRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de statut avec l'id: ${id}`);
    }
    return `le statut à l'id: ${id} a été supprimée!`;
  }
}
