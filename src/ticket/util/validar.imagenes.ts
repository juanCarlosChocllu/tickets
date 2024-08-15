import { BadRequestException } from "@nestjs/common";
import * as path from 'path';

 export function validarImagenes(file: Array<Express.Multer.File>){
     const extencionesValidas:string[]=['.png','.jpg', '.jpeg', '.PNG', '.JPG','.JPEG']  
    if( file === undefined || file.length === 0 ){
        throw new BadRequestException('Imagenes requeridas');
    }
    for(let img of file){
        const formatoInvalido=[]
            const extenciones = path.extname(img.originalname)
            const esValida=  extencionesValidas.includes(extenciones)
            if(esValida== false){
                const resultado ={
                    mensage:'Formato invalido',
                    file:img.originalname
                }
                throw new BadRequestException(resultado)
            }

        
    }

 }