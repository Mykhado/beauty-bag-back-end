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
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('rating')
@UseGuards(AuthGuard())
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto, @GetUser() users: User) {
    if (createRatingDto) {
      return this.ratingService.create(createRatingDto, users);
    } else {
      console.log('user id', users);
      console.log('DTO panier', createRatingDto);

      throw new BadRequestException(
        `Veuillez remplir tous les champs correctement !`,
      );
    }
  }
  s;
  @Get()
  findAll(@GetUser() users: User) {
    return this.ratingService.findAll(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() users: User) {
    return this.ratingService.findOne(id, users);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRatingDto: UpdateRatingDto,
    @GetUser() users: User,
  ) {
    return this.ratingService.update(id, updateRatingDto, users);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() users: User) {
    return this.ratingService.remove(id, users);
  }
}
