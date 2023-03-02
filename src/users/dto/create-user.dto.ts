import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: ' *le nom doit être une chaine de caractère',
  })
  @IsNotEmpty({
    message: ' *Le nom ne peux pas être vide',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le nom ne doit pas contenir d'espace",
  })
  @MinLength(1, {
    message: ' *Le nom doit contenir au moins un caractère ',
  })
  lastname: string;
  @IsString({
    message: ' *le prénom doit être une chaine de caractère',
  })
  @IsNotEmpty({
    message: ' *Le prénom ne peux pas être vide',
  })
  @Matches(/^[A-Za-z]*$/, {
    message: "*Le prénom ne doit pas contenir d'espace",
  })
  @MinLength(2, {
    message: ' *Le prénom doit contenir au moins deux caractères',
  })
  firstname: string;
  birthday?: string;
  gender?: string;
  address?: string;
  departement?: number;
  country?: string;
  town?: string;
  phone?: string;
  @IsEmail(
    {},
    {
      message: "Format d'email invalide",
    },
  )
  @IsString()
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
