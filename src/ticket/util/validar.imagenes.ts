import { BadRequestException } from "@nestjs/common";
import * as path from 'path';

 export function validarImagenes(file: Array<Express.Multer.File>){
     const extencionesValidas:string[]= ['.png','.jpg', '.PNG', '.JPG']   

    if(file.length === 0){
        throw new BadRequestException('Imagenes requeridas');
    }
    for(let img of file){
            const extenciones = path.extname(img.originalname)
            const validadas=  extencionesValidas.includes(extenciones)
            if(validadas== false){
                const resultado ={
                    mensage:'Formato invalido',
                    file:img.originalname
                }
                throw new BadRequestException(resultado);
            }
    }

 }