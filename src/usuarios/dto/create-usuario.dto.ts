import { IsString, IsStrongPassword } from "class-validator"


export class CreateUsuarioDto {
    @IsString()
    nombre:string
    @IsString()
    apellidos:string
    @IsString()
    usuario:string
    @IsString()
    contrasena:string
    
    
}
