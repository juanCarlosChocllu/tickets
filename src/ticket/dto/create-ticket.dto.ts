import { IsEnum, IsOptional, IsString } from "class-validator"
import { PrioridadEnum } from "../enum/prioridad.enum"


export class CreateTicketDto {
        @IsString()
        descripcion:string
        @IsEnum(PrioridadEnum)
        prioridad:string

        imagen:Express.Multer.File[]=[]


        

}
