import { Module } from '@nestjs/common';
import { MailToService } from './mail-to.service';
import { MailToController } from './mail-to.controller';
import { MailTo } from './entities/mail-to.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MailTo])],
  controllers: [MailToController],
  providers: [MailToService],
})
export class MailToModule {}
