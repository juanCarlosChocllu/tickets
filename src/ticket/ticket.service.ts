import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { constants } from 'buffer';
import { join } from 'path';
import * as fs from 'fs'
import  * as sharp from 'sharp';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket ,Imagen} from './schemas/ticket.echema';
import { Model, Types } from 'mongoose';
import { Flag } from 'src/enums/enum.flag';
import { ParametrosTicketDto } from './dto/paremetro-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly TicketSchema:Model<Ticket>,
    @InjectModel(Imagen.name) private readonly ImagentSchema:Model<Imagen>,
){}
  async create(createTicketDto: CreateTicketDto) {    
     try {
      const ticket = await this.TicketSchema.create(createTicketDto)
       await this.createImagen(ticket._id, createTicketDto)
       return ticket
     } catch (error) {
      throw new HttpException('Unprocessable entity', HttpStatus.UNPROCESSABLE_ENTITY);
     }
   
  }

  async createImagen(ticket:Types.ObjectId,createTicketDto:CreateTicketDto ){
    const img = this.convertirImagenWbp(createTicketDto.imagen)
    for(let i of await img){
      
      const imgDto ={
        ticket: ticket._id,
        urlImagen:i
      }
     await this.ImagentSchema.create(imgDto)
  }

  }

 async convertirImagenWbp(imagen:Express.Multer.File[]){
  const rutasImg:string[]=[]
    const outputDir = join(__dirname, '../../uploads/webp');
    if(!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir,{ recursive: true })
    }
    for(let file of imagen){
      const nombreImagen=`${file.fieldname}-${Date.now()}.webp`
      const outputFilePath = join(outputDir,nombreImagen); 
       await  sharp(file.buffer).toFile(outputFilePath);
      rutasImg.push(nombreImagen)
    }
    return rutasImg
  }



 async findAll() {
    const ticket = await this.TicketSchema.aggregate([
      {
        $lookup:{
          from:'imagens',
          localField:'_id',
          foreignField:'ticket',
          as : 'imagenes'
        }
      },
      {
        $match:{flag:Flag.nuevo}
      }
    ])
    return ticket ;
  }

  async findOne(id: string) {
    const ticket = await this.TicketSchema.aggregate([
      {
        $lookup:{
          from:'imagens',
          foreignField:'ticket',
          localField:'_id',
          as:'imagenes'
        }
       
      },
      {
        $match:{_id:new Types.ObjectId(id),flag:Flag.nuevo}
      }
    
    ]).exec()
    
    if(ticket.length <= 0 ){
      throw new NotFoundException('Ticket no encontrada')

    }
    return ticket;
  }

  async update(id:string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.TicketSchema.findOne({_id:id}).exec()
    if(!ticket){
      throw new NotFoundException('Ticket no encontrada')
    }


 if(updateTicketDto.idImagenes && updateTicketDto.idImagenes.length > 0 && updateTicketDto.imagen && updateTicketDto.imagen.length>0 ){
  if(updateTicketDto.idImagenes.length > updateTicketDto.imagen.length || updateTicketDto.imagen.length > updateTicketDto.idImagenes.length){
    throw new BadRequestException('mamoncito no')
        }
  for(let id of updateTicketDto.idImagenes){
     const img = await  this.ImagentSchema.findOne({_id:new Types.ObjectId(id)}).exec()
      if(!img){
        throw new NotFoundException('Imagen no encontrada')
      }
      this.updateImagen(id, updateTicketDto) 
  } 
 }
    await   this.TicketSchema.findByIdAndUpdate(id, updateTicketDto).exec()
    return   {status:HttpStatus.OK};
  }



  async  softDelete(id: string) {
    const ticket =  await this.TicketSchema.findOne({_id:id, flag:Flag.nuevo})
    if(!ticket){
      throw new NotFoundException('Ticket no encontrada')
    }
    const data=  await this.TicketSchema.findByIdAndUpdate(id, {flag:Flag.eliminado})
    return {status:HttpStatus.OK, mensage:'Ticket elimanado correctamente'};
  }

  async updateImagen(id:string,updateTicketDto :UpdateTicketDto ){
    const img = this.convertirImagenWbp(updateTicketDto.imagen)
    for(let i of await img){
    const data=  await this.ImagentSchema.findByIdAndUpdate(id,{urlImagen: i})
    const outputDir = join(__dirname, '../../uploads/webp/' + data.urlImagen);
    if(fs.existsSync(outputDir)){
       fs.unlinkSync(outputDir)     
    }
  }
  }




}
