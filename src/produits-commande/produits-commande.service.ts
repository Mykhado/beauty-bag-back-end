import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Panier } from 'src/panier/entities/panier.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProduitsCommandeDto } from './dto/create-produits-commande.dto';
import { UpdateProduitsCommandeDto } from './dto/update-produits-commande.dto';
import { ProduitsCommande } from './entities/produits-commande.entity';
import { Commande } from '../commandes/entities/commande.entity';

@Injectable()
export class ProduitsCommandeService {
  constructor(
    @InjectRepository(ProduitsCommande)
    private produitsCommandeRepository: Repository<ProduitsCommande>,
    @InjectRepository(Panier)
    private panierRepository: Repository<Panier>,
    @InjectRepository(Commande)
    private commandeRepository: Repository<Commande>,
  ) {}
  async create(createProduitsCommandeDto: CreateProduitsCommandeDto) {
    const newPanier = await this.panierRepository.find();
    console.log('newPanier', newPanier);
    return newPanier.map(async (x) => {
      const newId = x.product.id;
      console.log('new id ', newId);
      createProduitsCommandeDto.quantity = x.quantity;
      createProduitsCommandeDto.product = x.product;
      console.log('DTO prod', createProduitsCommandeDto);
      console.log('DTO quant', createProduitsCommandeDto.quantity);

      await this.produitsCommandeRepository.save(createProduitsCommandeDto);
    });
  }

  async findAll() {
    return await this.produitsCommandeRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} produitsCommande`;
  }

  async update(
    id: number,
    updateProduitsCommandeDto: UpdateProduitsCommandeDto,
  ) {
    return `This action updates a #${id} produitsCommande`;
  }

  async remove(id: number) {
    return `This action removes a #${id} produitsCommande`;
  }
}
