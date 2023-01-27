import { Module } from '@nestjs/common';
import { MailToService } from './mail-to.service';
import { MailToController } from './mail-to.controller';

@Module({
  controllers: [MailToController],
  providers: [MailToService]
})
export class MailToModule {}
