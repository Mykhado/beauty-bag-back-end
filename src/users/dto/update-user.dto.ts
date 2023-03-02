import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Matches, MinLength } from 'class-validator';
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

  @IsOptional()
  @IsString()
  @MinLength(6, {
    message: '*Le mot de passe doit contenir au moins 6 caractères',
  })
  @Matches(/^^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_])/, {
    message:
      '*Le mot de passe doit contenir une majuscule, une minuscule,un caractere spécial et un nombre',
  })
  password: string;
}
