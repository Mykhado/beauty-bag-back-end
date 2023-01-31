import { Module } from '@nestjs/common';
import { MailToService } from './mail-to.service';
import { MailToController } from './mail-to.controller';
import { MailTo } from './entities/mail-to.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Commande } from '../commandes/entities/commande.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MailTo, Commande]), AuthModule],
  controllers: [MailToController],
  providers: [MailToService],
})
export class MailToModule {}
