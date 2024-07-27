import { IsMongoId, IsString, IsStrongPassword } from "class-validator"
import { Types } from "mongoose"


export class CreateUsuarioDto {
    @IsString()
    nombre:string
    @IsString()
    apellidos:string
    @IsString()
    usuario:string
    @IsString()
    contrasena:string
    @IsMongoId()
    sucursal:Types.ObjectId
    @IsMongoId()
    area:Types.ObjectId


}
