import { Panier } from 'src/panier/entities/panier.entity';
import { User } from '../../users/entities/user.entity';
import { ProduitsCommande } from '../../produits-commande/entities/produits-commande.entity';
export class CreateCommandeDto {
  orderNumber: string;
  lastnameDelivery: string;
  firstnameDelivery: string;
  addressDelivery: string;
  departementDelivery: number;
  countryDelivery: string;
  townDelivery: string;
  phoneDelivery: string;
  send: boolean;
  date: Date;
  user?: User;
}
