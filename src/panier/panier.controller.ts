import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PanierService } from './panier.service';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('panier')
@UseGuards(AuthGuard())
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post()
  create(@Body() createPanierDto: CreatePanierDto, @GetUser() user: User) {
    if (createPanierDto) {
      return this.panierService.create(createPanierDto, user);
    } else {
      console.log('user id', user);
      console.log('DTO commandes', createPanierDto);

      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Get()
  findAll() {
    return this.panierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.panierService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePanierDto: UpdatePanierDto) {
    return this.panierService.update(id, updatePanierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.panierService.remove(id);
  }
}
