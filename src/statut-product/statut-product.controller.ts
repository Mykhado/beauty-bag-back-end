import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StatutProductService } from './statut-product.service';
import { CreateStatutProductDto } from './dto/create-statut-product.dto';
import { UpdateStatutProductDto } from './dto/update-statut-product.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('statut-product')
export class StatutProductController {
  constructor(private readonly statutProductService: StatutProductService) {}

  @Post()
  @UseGuards(AuthGuard(), AdminGuard)
  create(@Body() createStatutProductDto: CreateStatutProductDto) {
    return this.statutProductService.create(createStatutProductDto);
  }

  @Get()
  findAll() {
    return this.statutProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statutProductService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateStatutProductDto: UpdateStatutProductDto,
  ) {
    return this.statutProductService.update(id, updateStatutProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  remove(@Param('id') id: string) {
    return this.statutProductService.remove(id);
  }
}
