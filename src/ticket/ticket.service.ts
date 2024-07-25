import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { constants } from 'buffer';
import { join } from 'path';
import { mkdirp } from 'mkdirp';
import  * as sharp from 'sharp';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket ,Imagen} from './schemas/ticket.echema';
import { Model, Types } from 'mongoose';

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
    for(let file of imagen){
      const outputFilePath = join(outputDir, `${file.fieldname}-${Date.now()}.webp`);
       await   sharp(file.buffer).toFile(outputFilePath);
      rutasImg.push(outputFilePath)
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
      }
    ])
    return ticket ;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
