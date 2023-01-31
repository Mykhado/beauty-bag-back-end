import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitsCommandeDto } from './create-produits-commande.dto';

export class UpdateProduitsCommandeDto extends PartialType(
  CreateProduitsCommandeDto,
) {
  quantity: number;
}
