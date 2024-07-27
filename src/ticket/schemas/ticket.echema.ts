import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"
import { EstadoEnum } from "../enum/estado.enum"

@Schema()
export class Ticket {
    @Prop()
    descripcion:string
    @Prop()
    prioridad:string
    @Prop({type:String, enum:EstadoEnum,   default: EstadoEnum.Pendiente})
    estado:EstadoEnum
    
    @Prop({type:Types.ObjectId, ref:'Sucursal'})
     sucursal:Types.ObjectId

    @Prop({type:Date, default:Date.now()})
    fechaCreacion:Date
}


export const  TicketSchema= SchemaFactory.createForClass(Ticket)

@Schema()
export class Imagen{
    @Prop({type:Types.ObjectId, ref:'Ticket'})
    ticket:Types.ObjectId
    @Prop()
    urlImagen:string
}

export const  ImagenSchema= SchemaFactory.createForClass(Imagen)