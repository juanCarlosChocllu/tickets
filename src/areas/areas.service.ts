import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Area } from './schemas/area.schema';
import { Model } from 'mongoose';
import { Flag } from 'src/enums/enum.flag';

@Injectable()
export class AreasService {
  constructor(@InjectModel(Area.name) private readonly AreaSchema:Model<Area>){}
  async create(createAreaDto: CreateAreaDto) {
    const areaExiste= await this.AreaSchema.findOne({nombre:createAreaDto.nombre, flag:Flag.nuevo}).exec()
    if(areaExiste){
      throw new ConflictException('Ya existe el area')
    }
    this.AreaSchema.create(createAreaDto)
    return  {estatus:HttpStatus.CREATED};
  }

  findAll() {
    return  this.AreaSchema.find({flag:Flag.nuevo}).select('nombre');
  }

  async findOne(id: string) {
    const area= await this.validadArea(id)
    return area;
  }

 async update(id: string, updateAreaDto: UpdateAreaDto) {
    await this.validadArea(id)
    await this.AreaSchema.findByIdAndUpdate(id, updateAreaDto)
    return {status:HttpStatus.OK};
  }

  async softDelete(id: string) {
    await this.validadArea(id)
    await this.AreaSchema.findByIdAndUpdate(id, {flag:Flag.eliminado})
    return  {status:HttpStatus.OK};
  }


   private async validadArea(id:string){
      const area = await this.AreaSchema.findOne({_id:id})
      if(!area){
        throw new NotFoundException('No se encontro la area')
      }
      return area


   }
}
