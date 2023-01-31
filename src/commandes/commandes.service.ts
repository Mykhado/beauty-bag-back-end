import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { User } from '../users/entities/user.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { ProduitsCommande } from '../produits-commande/entities/produits-commande.entity';
import { runInThisContext } from 'vm';
import { CreateProduitsCommandeDto } from '../produits-commande/dto/create-produits-commande.dto';

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
  ) {}
  async create(
    createCommandeDto: CreateCommandeDto,
    // utilisation du user via le @GetUser afin de rattacher cette commande a celui qui est connecté
    users: User,
  ): Promise<string> {
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
    userPanier.map(async (panierProduct) => {
      const commande = {
        id: newCommande.id,
      };
      const newProduitCommande = { ...panierProduct, commande };
      await this.produitsCommandeRepository.save(newProduitCommande);
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

    return 'Commande validée';
  }

  async findAll(): Promise<Commande[]> {
    return await this.commandeRepository.find();
  }

  async findOne(id: number): Promise<Commande> {
    const commandeFound = await this.commandeRepository.findOneBy({ id: id });
    if (!commandeFound) {
      throw new NotFoundException(`Pas de commande avec l'id: ${id}`);
    }
    return commandeFound;
  }

  async update(
    id: number,
    updateCommandeDto: UpdateCommandeDto,
  ): Promise<Commande> {
    const updateCommande = await this.findOne(id);
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

  async remove(id: string) {
    const result = await this.commandeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de commande avec l'id: ${id}`);
    }
    return `la commande à l'id: ${id} a été supprimée!`;
  }
}
