import { Panier } from 'src/panier/entities/panier.entity';
import { Product } from '../../products/entities/product.entity';
import { Commande } from '../../commandes/entities/commande.entity';

export class CreateProduitsCommandeDto {
  quantity?: number;
  product: Product;
  commande: Commande;
}
