import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  // Ajout constructor pour interagir avec la table Users
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      //  verification de la presence d'un role user dans la table role pour l'attribué a un "const"
      try {
        const roleUser = await this.roleRepository.findOneBy({
          role: 'user',
        });
        console.log('valeur de roleUser', roleUser);
      } catch (error) {
        console.log('affichage de error', error);
        throw new NotFoundException('aucun user dans la table role');
      }
      // nous recuperons toutes les informations rentré par l'utilisateur via le DTO
      const userCreate = await this.userRepository.save(createUserDto);
      // verification des données receptionné
      console.log(userCreate);
      //  configuration du nombre d'iteration pour le cryptage
      const saltOrRounds = 10;
      // stockage du password dans le DTO dans une variable
      const password = userCreate.password;
      // verification de la valeur
      console.log('password: ', password);
      // Cryptage du password avec B-crypt
      const hash = await bcrypt.hash(password, saltOrRounds);
      //  verification du mot de passe crypté
      console.log('hash: ', hash);
      // attribution du mot de passe crypté au mot de passe dans le DTO
      userCreate.password = hash;
      // verification de la valeur
      console.log('user create password: ', userCreate.password);
      //  sauvegarde du DTO dans la BDD
      return await this.userRepository.save(userCreate);
      // Gestion des erreurs
    } catch (error) {
      console.log('error----', error);

      if (error.code === '23505') {
        throw new ConflictException('email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
