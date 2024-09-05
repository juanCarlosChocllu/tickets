import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Flag } from 'src/enums/enum.flag';

@Schema()
export class Usuario {
  toObject(): { [x: string]: any; contrasena: any } {
    throw new Error('Method not implemented.');
  }
  @Prop()
  nombre: string;
  @Prop()
  apellidos: string;
  @Prop()
  usuario: string;
  @Prop()
  contrasena: string;
  @Prop({ type: Types.ObjectId, ref: 'Sucursal' })
  sucursal: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'area' })
  area: Types.ObjectId;
  
  @Prop()
  rol:string
  
  @Prop({ type: Date, default: Date.now() })
  fechaCreacion: Date;
  @Prop({ type: String, enum: Flag, default: Flag.nuevo })
  flag: Flag;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
