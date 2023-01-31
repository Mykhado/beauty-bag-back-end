import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Controller('commandes')
//  le UseGuards permet de controller le token afin de pouvoir executer les requetes suivantes
@UseGuards(AuthGuard())
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  createCommande(
    @Body() createCommandeDto: CreateCommandeDto,
    @GetUser() user: User,
  ) {
    // verifictation que tout les champs soient remplies afin de gerer l'erreur
    if (
      createCommandeDto.orderNumber &&
      createCommandeDto.lastnameDelivery &&
      createCommandeDto.firstnameDelivery &&
      createCommandeDto.addressDelivery &&
      createCommandeDto.departementDelivery &&
      createCommandeDto.countryDelivery &&
      createCommandeDto.townDelivery &&
      createCommandeDto.phoneDelivery &&
      // send par defaut sur false mais on verifie l'inverse de cette valeur pour que la condition soit vraie et autorise le create
      !createCommandeDto.send
    ) {
      return this.commandesService.create(createCommandeDto, user);
    } else {
      console.log('user id', user);
      console.log('DTO commandes', createCommandeDto);
      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Get()
  findAll() {
    return this.commandesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commandesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return this.commandesService.update(id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandesService.remove(id);
  }
}
