import {
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Types } from 'mongoose';
import { rolEnum } from 'src/enums/rol.enum';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsString()
  apellidos: string;

  @IsString()
  usuario: string;

  @IsString()
  contrasena: string;

  @IsMongoId()
  sucursal: Types.ObjectId;

  @IsEnum(rolEnum)
  rol: string;

  @IsMongoId()
  area: Types.ObjectId;
}
