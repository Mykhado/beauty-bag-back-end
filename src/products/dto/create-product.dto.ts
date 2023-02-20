import { Category } from 'src/category/entities/category.entity';

export class CreateProductDto {
  name: string;
  unitPrice: number;
  quantityGlobal: number;
  rateGlobal?: number;
  category: Category;
}
