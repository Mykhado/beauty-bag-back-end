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
      const roleUser = await this.roleRepository.findOneBy({
        role: 'user',
      });
      console.log('valeur de roleUser', roleUser);
      if (roleUser === null) {
        throw new NotFoundException(
          'roleUser = null merci de verifier la table role',
        );
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
      // attribution du role au user
      userCreate.role = roleUser;
      //  verification afin d'etre sur que l'utilisateur créer est un user
      if (userCreate.role.role !== 'user') {
        throw new NotFoundException(`Pas un user !!!`);
      }
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

  async findOne(id: string) {
    const userFound = await this.userRepository.findOneBy({ id: id });
    if (!userFound) {
      throw new NotFoundException(`Pas d'utilisateurs avec l'id : ${id}`);
    }
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userUpdate = await this.findOne(id);
    // verification de chacune des valeurs et si celle-ci n est pas undefined on lui attribut celle du DTO
    if (userUpdate.lastname !== undefined) {
      userUpdate.lastname = updateUserDto.lastname;
    }
    if (userUpdate.birthday !== undefined) {
      userUpdate.birthday = updateUserDto.birthday;
    }
    if (userUpdate.email !== undefined) {
      userUpdate.email = updateUserDto.email;
    }
    if (userUpdate.gender !== undefined) {
      userUpdate.gender = updateUserDto.gender;
    }
    if (userUpdate.gender !== undefined) {
      console.log('userUpdate.gender: ', userUpdate.gender);
      userUpdate.gender = updateUserDto.gender;
    }
    if (userUpdate.firstname !== undefined) {
      userUpdate.firstname = updateUserDto.firstname;
    }
    if (updateUserDto.password !== undefined) {
      // recuperation du nouveau et hachage de celui-ci
      console.log('updateUserDto.password: ', updateUserDto.password);
      const saltOrRounds = 10;
      const password = updateUserDto.password;
      console.log('password: ', password);

      const hash = await bcrypt.hash(password, saltOrRounds);
      console.log('hash: ', hash);
      userUpdate.password = hash;
      console.log('user create password: ', userUpdate.password);
      console.log('user dto password: ', updateUserDto.password);
    }
    if (userUpdate.departement !== undefined) {
      userUpdate.departement = updateUserDto.departement;
    }

    if (userUpdate.country !== undefined) {
      userUpdate.country = userUpdate.country;
    }
    if (userUpdate.town !== undefined) {
      userUpdate.town = updateUserDto.town;
    }
    if (userUpdate.phone !== undefined) {
      userUpdate.phone = updateUserDto.phone;
    }
    if (userUpdate.address !== undefined) {
      userUpdate.address = updateUserDto.address;
    }
    return await this.userRepository.save(userUpdate);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
