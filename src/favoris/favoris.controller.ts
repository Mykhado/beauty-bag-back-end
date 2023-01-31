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
import { FavorisService } from './favoris.service';
import { CreateFavorisDto } from './dto/create-favoris.dto';
import { UpdateFavorisDto } from './dto/update-favoris.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('favoris')
@UseGuards(AuthGuard())
export class FavorisController {
  constructor(private readonly favorisService: FavorisService) {}

  @Post()
  create(@Body() createFavorisDto: CreateFavorisDto, @GetUser() users: User) {
    if (createFavorisDto) {
      return this.favorisService.create(createFavorisDto, users);
    } else {
      console.log('user id', users);
      console.log('DTO favoris', createFavorisDto);

      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }

  @Get()
  findAll(@GetUser() users: User) {
    return this.favorisService.findAll(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() users: User) {
    return this.favorisService.findOne(id, users);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavorisDto: UpdateFavorisDto,
    @GetUser() users: User,
  ) {
    // return this.favorisService.update(+id, updateFavorisDto, users);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() users: User) {
    return this.favorisService.remove(id, users);
  }
}
