import { IsString } from "class-validator";


export class CreateSucursalDto {
    @IsString()
    nombre:string
}
