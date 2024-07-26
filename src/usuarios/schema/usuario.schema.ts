import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

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
    @Prop({type:Date, default:Date.now()})
    fechaCreacion:Date
}


export const UsuarioSchema= SchemaFactory.createForClass(Usuario)
