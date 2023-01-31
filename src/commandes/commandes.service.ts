import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from './entities/commande.entity';
import { User } from '../users/entities/user.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { ProduitsCommande } from '../produits-commande/entities/produits-commande.entity';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
    @InjectRepository(ProduitsCommande)
    private produitsCommandeRepository: Repository<ProduitsCommande>,
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
  ) {}
  async create(
    createCommandeDto: CreateCommandeDto,
    users: User,
  ): Promise<Commande> {
    const recupPanier = await this.panierRepository.find();
    // recupPanier.map(async (x) => await this.produitsCommandeRepository.save(x));

    // console.log(
    //   'produits commande apres map sauvegarde',
    //   this.produitsCommandeRepository,
    // );

    const user = {
      id: users.id,
      panier: users.panier,
    };
    console.log('verification user', user);

    const newCommande = { ...createCommandeDto, user };
    console.log('newCommande');
    return await this.commandeRepository.save(newCommande);
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
