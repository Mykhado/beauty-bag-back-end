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
@UseGuards(AuthGuard())
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  createCommande(
    @Body() createCommandeDto: CreateCommandeDto,
    @GetUser() user: User,
  ) {
    if (createCommandeDto) {
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
