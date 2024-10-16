import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EstadoEnum } from '../enum/estado.enum';
import { Flag } from 'src/enums/enum.flag';
import { flagService } from '../enum/flag.servicio.enum';

@Schema()
export class Ticket {
  @Prop()
  codigoTicket: string;

  @Prop()
  descripcion: string;

  @Prop()
  prioridad: string;

  @Prop({ type: String, enum: EstadoEnum, default: EstadoEnum.Pendiente })
  estado: EstadoEnum;

  @Prop({ type: Types.ObjectId, ref: 'Sucursal' })
  sucursal: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Area' })
  area: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Usuario' })
  usuario: Types.ObjectId;

  @Prop({ type: Date, default: Date.now() })
  fechaCreacion: Date;

  

  @Prop({ type: String, enum: Flag, default: Flag.nuevo })
  flag: Flag;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

@Schema()
export class Imagen {
  @Prop({ type: Types.ObjectId, ref: 'Ticket' })
  ticket: Types.ObjectId;
  @Prop()
  urlImagen: string;
  
  @Prop({ type: String, enum: flagService, default: flagService.no_reparada})
  flagServicio: flagService;

  @Prop({ type: String, enum: Flag, default: Flag.nuevo })
  flag: Flag;
}

export const ImagenSchema = SchemaFactory.createForClass(Imagen);
