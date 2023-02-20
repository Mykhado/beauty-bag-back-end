import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatutProductService } from './statut-product.service';
import { CreateStatutProductDto } from './dto/create-statut-product.dto';
import { UpdateStatutProductDto } from './dto/update-statut-product.dto';

@Controller('statut-product')
export class StatutProductController {
  constructor(private readonly statutProductService: StatutProductService) {}

  @Post()
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
  update(
    @Param('id') id: string,
    @Body() updateStatutProductDto: UpdateStatutProductDto,
  ) {
    return this.statutProductService.update(id, updateStatutProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statutProductService.remove(id);
  }
}
