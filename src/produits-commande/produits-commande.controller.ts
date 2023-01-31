import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ProduitsCommandeService } from './produits-commande.service';
import { CreateProduitsCommandeDto } from './dto/create-produits-commande.dto';
import { UpdateProduitsCommandeDto } from './dto/update-produits-commande.dto';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('produits-commande')
export class ProduitsCommandeController {
  constructor(
    private readonly produitsCommandeService: ProduitsCommandeService,
  ) {}

  @Post()
  create(
    @Body() createProduitsCommandeDto: CreateProduitsCommandeDto,
    // @GetUser() user: User,
  ) {
    if (createProduitsCommandeDto) {
      return this.produitsCommandeService.create(
        createProduitsCommandeDto,
        // user,
      );
    } else {
      // console.log('user id', user);
      console.log('DTO commandes', createProduitsCommandeDto);

      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Get()
  findAll() {
    return this.produitsCommandeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitsCommandeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProduitsCommandeDto: UpdateProduitsCommandeDto,
  ) {
    return this.produitsCommandeService.update(+id, updateProduitsCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitsCommandeService.remove(+id);
  }
}
