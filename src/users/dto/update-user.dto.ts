import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  lastname: string;
  firstname: string;
  birthday: string;
  gender: string;
  address: string;
  departement: number;
  country: string;
  town: string;
  phone: string;
  email: string;
  password: string;
}
