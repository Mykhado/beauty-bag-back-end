import { PartialType } from '@nestjs/mapped-types';
import { CreateMailToDto } from './create-mail-to.dto';

export class UpdateMailToDto extends PartialType(CreateMailToDto) {}
