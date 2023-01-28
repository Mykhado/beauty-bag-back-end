import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMailToDto } from './dto/create-mail-to.dto';
import { UpdateMailToDto } from './dto/update-mail-to.dto';
import { MailTo } from './entities/mail-to.entity';

@Injectable()
export class MailToService {
  constructor(
    @InjectRepository(MailTo)
    private mailToRepository: Repository<MailTo>,
  ) {}
  async create(createMailToDto: CreateMailToDto): Promise<MailTo> {
    return await this.mailToRepository.create(createMailToDto);
  }

  async findAll(): Promise<MailTo[]> {
    return await this.mailToRepository.find();
  }

  async findOne(id: string) {
    return `This action returns a #${id} mailTo`;
  }

  async update(id: string, updateMailToDto: UpdateMailToDto) {
    return `This action updates a #${id} mailTo`;
  }

  async remove(id: string) {
    const result = await this.mailToRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Pas de mail avec l'id: ${id}`);
    }
    return `le mail avec l'id: ${id} a été supprimé!`;
  }
}
