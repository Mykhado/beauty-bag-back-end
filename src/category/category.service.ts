import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string) {
    const categoryFound = await this.categoryRepository.findOneBy({ id: id });
    if (!categoryFound) {
      throw new NotFoundException(`Pas de category avec l'id: ${id}`);
    }
    return categoryFound;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const updateCategory = await this.findOne(id);
    if (updateCategory.name !== undefined) {
      updateCategory.name = updateCategoryDto.name;
    }

    return await this.categoryRepository.save(updateCategory);
  }

  async remove(id: string) {
    const result = await this.categoryRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de category avec l'id: ${id}`);
    }
    return `la category à l'id: ${id} a été supprimée!`;
  }
}
