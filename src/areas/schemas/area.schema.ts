import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Area {
    @Prop()
    nombre:string
    @Prop({type:Date, default:Date.now()})
    fechaCreacion:Date

}

export const AreaSchema= SchemaFactory.createForClass(Area)
