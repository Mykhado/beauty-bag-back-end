import { PartialType } from '@nestjs/mapped-types';
import { CreateStatutProductDto } from './create-statut-product.dto';

export class UpdateStatutProductDto extends PartialType(
  CreateStatutProductDto,
) {
  name: string;
}
