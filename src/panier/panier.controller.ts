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
  create(@Body() createPanierDto: CreatePanierDto, @GetUser() users: User) {
    if (createPanierDto) {
      return this.panierService.create(createPanierDto, users);
    } else {
      console.log('user id', users);
      console.log('DTO panier', createPanierDto);

      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Get()
  findAll(@GetUser() users: User) {
    return this.panierService.findAll(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() users: User) {
    return this.panierService.findOne(id, users);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePanierDto: UpdatePanierDto,
    @GetUser() users: User,
  ) {
    return this.panierService.update(id, updatePanierDto, users);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() users: User) {
    return this.panierService.remove(id, users);
  }
}
