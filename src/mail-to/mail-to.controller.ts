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
import { MailToService } from './mail-to.service';
import { CreateMailToDto } from './dto/create-mail-to.dto';
import { UpdateMailToDto } from './dto/update-mail-to.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('mail-to')
export class MailToController {
  constructor(private readonly mailToService: MailToService) {}

  @Post()
  create(@Body() createMailToDto: CreateMailToDto) {
    return this.mailToService.create(createMailToDto);
  }

  @Get()
  findAll() {
    return this.mailToService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailToService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailToDto: UpdateMailToDto) {
    return this.mailToService.update(id, updateMailToDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailToService.remove(id);
  }
}
