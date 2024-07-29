import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose"
import { Flag } from "src/enums/enum.flag"

@Schema()
export class Area {
    @Prop()
    nombre:string
    @Prop({type:Date, default:Date.now()})
    fechaCreacion:Date
    @Prop({type:String, enum:Flag, default:Flag.nuevo })
    flag:Flag

}

export const AreaSchema= SchemaFactory.createForClass(Area)
