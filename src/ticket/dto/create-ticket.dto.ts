import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PrioridadEnum } from '../enum/prioridad.enum';
import { Types } from 'mongoose';

export class CreateTicketDto {
  @IsString()
  descripcion: string;

  @IsEnum(PrioridadEnum)
  prioridad: string;

  @IsMongoId()
  area: Types.ObjectId;

  imagen: Express.Multer.File[] = [];

  usuario: Types.ObjectId;

  codigoTicket: string;

  sucursal: Types.ObjectId;
}
