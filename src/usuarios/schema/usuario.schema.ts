import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema()
export class Usuario {
    @Prop()
    nombre:string
    @Prop()
    apellidos:string
    @Prop()
    usuario:string
    @Prop()
    contrasena:string
    @Prop({type:Types.ObjectId, ref:'Sucursal'})
    sucursal:Types.ObjectId
    
    @Prop({type:Types.ObjectId, ref:'area'})
    area:Types.ObjectId
    @Prop({type:Date, default:Date.now()})
    fechaCreacion:Date
}


export const UsuarioSchema= SchemaFactory.createForClass(Usuario)
