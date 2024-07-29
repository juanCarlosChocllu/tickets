import { IsString } from "class-validator";

export class AutenticacionDto {
    @IsString()
    usuario:string
    
    @IsString()
    contrasena:string
}
