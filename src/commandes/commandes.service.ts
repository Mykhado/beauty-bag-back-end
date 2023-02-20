import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { User } from '../users/entities/user.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { ProduitsCommande } from '../produits-commande/entities/produits-commande.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CommandesService {
  constructor(
    // injection des different repository afin de pouvoir tavailler sur les table necessaire en fonction de nos besoin
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
    @InjectRepository(ProduitsCommande)
    private produitsCommandeRepository: Repository<ProduitsCommande>,
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(
    createCommandeDto: CreateCommandeDto,
    // utilisation du user via le @GetUser afin de rattacher cette commande a celui qui est connecté
    users: User,
  ): Promise<Product[]> {
    // stockage de l'Id de l'utilisateur dans un objet grace aux de users
    const user = {
      id: users.id,
    };
    // recuperation du panier de l'utilisateur connecté
    const userPanier = users.panier;
    console.log('user panier ', userPanier);

    //  creation de la commande en amont afin de pouvoir un rattacher les produits commandé
    const userCommande = { ...createCommandeDto, user };
    const newCommande = await this.commandeRepository.save(userCommande);
    // injection 1 par 1 via le map des produit du panier dans produit commandé et suppression par la suite de cet element du panier user
    const product = await this.productRepository.find();
    userPanier.map(async (panierProduct) => {
      const commande = {
        id: newCommande.id,
      };
      const newProduitCommande = { ...panierProduct, commande };
      await this.produitsCommandeRepository.save(newProduitCommande);
      // test --------------------
      // const resultProduct = await this.productRepository.find();
      // console.log('table produit resultproduct', resultProduct);
      // const oneProduct = await resultProduct.find(
      //   (product) => product.name === panierProduct.product.name,
      // );
      // console.log(
      //   '---------------------------one product verification de loupé',
      //   oneProduct,
      // );

      // console.log(
      //   'panierproduct----------------------------------------debut',
      //   panierProduct,
      // );

      // console.log('le produit recupéré aprés find', oneProduct);

      // const calculQuantity = oneProduct.quantityGlobal - panierProduct.quantity;
      // console.log(
      //   'produit recupéré quantité globale avant opé',
      //   oneProduct.quantityGlobal,
      // );
      // oneProduct.quantityGlobal = calculQuantity;
      // console.log('produit du panier quantité', panierProduct.quantity);

      // console.log(
      //   'produit recupéré quantité globale apres opé-----------------------------------fin',
      //   oneProduct.quantityGlobal,
      // );
      // await this.productRepository.save(oneProduct);

      const deleteProductPanier = await this.panierRepository.delete(
        panierProduct.id,
      );
      if (deleteProductPanier.affected === 0) {
        throw new NotFoundException(
          `Pas de produit dans le panier  avec l'id: ${panierProduct.id}`,
        );
      } else {
        console.log(`produit ${panierProduct.product.id} du panier supprimmé `);
      }
    });

    return product;
  }

  async findAll(users: User): Promise<Commande[]> {
    const queryAllCommande = this.commandeRepository.createQueryBuilder();
    queryAllCommande.where({ user: users });
    return queryAllCommande.getMany();
  }

  async findOne(id: number, users: User): Promise<Commande> {
    const queryCommandeById =
      await this.commandeRepository.createQueryBuilder();
    queryCommandeById.where({ id: id }).andWhere({ user: users });
    const found = await queryCommandeById.getOne();
    console.log(found);
    if (!found) {
      throw new NotFoundException(`Pas de commande avec l'id: ${id}`);
    } else {
      return found;
    }
  }

  async update(
    id: number,
    updateCommandeDto: UpdateCommandeDto,
    users: User,
  ): Promise<Commande> {
    const queryUpdateCommande = this.commandeRepository.createQueryBuilder();
    queryUpdateCommande.where({ id: id }).andWhere({ user: users });
    const patch = await queryUpdateCommande.getOne();
    console.log(!patch);
    if (!queryUpdateCommande) {
      throw new NotFoundException(
        `Pas de commande modifiable avec l'id: ${id}`,
      );
    }
    const updateCommande = await this.findOne(id, users);
    if (updateCommande.orderNumber !== undefined) {
      updateCommande.orderNumber = updateCommandeDto.orderNumber;
    }
    if (updateCommande.lastnameDelivery !== undefined) {
      updateCommande.lastnameDelivery = updateCommandeDto.lastnameDelivery;
    }
    if (updateCommande.firstnameDelivery !== undefined) {
      updateCommande.firstnameDelivery = updateCommandeDto.firstnameDelivery;
    }
    if (updateCommande.date !== undefined) {
      updateCommande.date = updateCommandeDto.date;
    }
    if (updateCommande.addressDelivery !== undefined) {
      updateCommande.addressDelivery = updateCommandeDto.addressDelivery;
    }
    if (updateCommande.departementDelivery !== undefined) {
      updateCommande.departementDelivery =
        updateCommandeDto.departementDelivery;
    }
    if (updateCommande.countryDelivery !== undefined) {
      updateCommande.countryDelivery = updateCommandeDto.countryDelivery;
    }
    if (updateCommande.townDelivery !== undefined) {
      updateCommande.townDelivery = updateCommandeDto.townDelivery;
    }
    if (updateCommande.phoneDelivery !== undefined) {
      updateCommande.phoneDelivery = updateCommandeDto.phoneDelivery;
    }

    if (updateCommande.send !== undefined) {
      updateCommande.send = updateCommandeDto.send;
    }

    return await this.commandeRepository.save(updateCommande);
  }

  async remove(id: string, users: User): Promise<string> {
    const queryDeleteCommandeById =
      await this.commandeRepository.createQueryBuilder();
    queryDeleteCommandeById.where({ id: id }).andWhere({ user: users });
    const found = await queryDeleteCommandeById.getOne();
    if (!found) {
      throw new NotFoundException(`Pas de commande avec l'id: ${id}`);
    } else {
      await this.commandeRepository.delete(+id);
      return `commande avec l'id: ${id} supprimé`;
    }
  }
}
