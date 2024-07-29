import { IsString } from "class-validator";

export class CreateAutenticacionDto {
    @IsString()
    usuario:string
    
    @IsString()
    contrasena:string
}
