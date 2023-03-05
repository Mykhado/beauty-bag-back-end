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
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('mail-to')
@UseGuards(AuthGuard())
export class MailToController {
  constructor(private readonly mailToService: MailToService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createMailToDto: CreateMailToDto) {
    return this.mailToService.create(createMailToDto);
  }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
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
  @UseGuards(AuthGuard(), AdminGuard)
  remove(@Param('id') id: string) {
    return this.mailToService.remove(id);
  }
}
