import { PartialType } from '@nestjs/mapped-types';
import { CreateCommandeDto } from './create-commande.dto';

export class UpdateCommandeDto extends PartialType(CreateCommandeDto) {
  lastnameDelivery: string;
  firstnameDelivery: string;
  date!: Date;
  addressDelivery: string;
  departementDelivery: number;
  countryDelivery: string;
  townDelivery: string;
  phoneDelivery: string;
  orderNumber: string;
  send: boolean;
}
