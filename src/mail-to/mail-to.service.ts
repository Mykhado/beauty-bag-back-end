import { Injectable } from '@nestjs/common';
import { CreateMailToDto } from './dto/create-mail-to.dto';
import { UpdateMailToDto } from './dto/update-mail-to.dto';

@Injectable()
export class MailToService {
  create(createMailToDto: CreateMailToDto) {
    return 'This action adds a new mailTo';
  }

  findAll() {
    return `This action returns all mailTo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailTo`;
  }

  update(id: number, updateMailToDto: UpdateMailToDto) {
    return `This action updates a #${id} mailTo`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailTo`;
  }
}
