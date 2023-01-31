import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    const productFound = await this.productsRepository.findOneBy({ id: id });
    if (!productFound) {
      throw new NotFoundException(`Pas de produit avec l'id: ${id}`);
    }
    return productFound;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updateProduct = await this.findOne(id);
    if (updateProduct.name !== undefined) {
      updateProduct.name = updateProductDto.name;
    }
    if (updateProduct.unitPrice !== undefined) {
      updateProduct.unitPrice = updateProductDto.unitPrice;
    }
    if (updateProduct.quantityGlobal !== undefined) {
      updateProduct.quantityGlobal = updateProductDto.quantityGlobal;
    }

    return await this.productsRepository.save(updateProduct);
  }

  async remove(id: string) {
    const result = await this.productsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de produit avec l'id: ${id}`);
    }
    return `le produit à l'id: ${id} a été supprimé!`;
  }
}
