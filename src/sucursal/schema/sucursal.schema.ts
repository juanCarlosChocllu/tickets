import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Sucursal {
    @Prop()
    nombre:string
    @Prop({type:Date, default:Date.now()})
    fechaCreacion:Date
}
export const SucursalSchema= SchemaFactory.createForClass(Sucursal)