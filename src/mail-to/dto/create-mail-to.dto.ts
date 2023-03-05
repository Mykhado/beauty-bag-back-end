import { Commande } from '../../commandes/entities/commande.entity';
export class CreateMailToDto {
  message: string;
  commande: Commande;
  email: string;
}
