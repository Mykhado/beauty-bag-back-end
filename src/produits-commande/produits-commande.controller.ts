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
import { ProduitsCommandeService } from './produits-commande.service';
import { CreateProduitsCommandeDto } from './dto/create-produits-commande.dto';
import { UpdateProduitsCommandeDto } from './dto/update-produits-commande.dto';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('produits-commande')
@UseGuards(AuthGuard())
export class ProduitsCommandeController {
  constructor(
    private readonly produitsCommandeService: ProduitsCommandeService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
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
  @UseGuards(AuthGuard())
  findAll() {
    return this.produitsCommandeService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.produitsCommandeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateProduitsCommandeDto: UpdateProduitsCommandeDto,
  ) {
    return this.produitsCommandeService.update(+id, updateProduitsCommandeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.produitsCommandeService.remove(+id);
  }
}
