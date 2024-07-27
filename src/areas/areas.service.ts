import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Area } from './schemas/area.schema';
import { Model } from 'mongoose';

@Injectable()
export class AreasService {
  constructor(@InjectModel(Area.name) private readonly AreaSchema:Model<Area>){}
  create(createAreaDto: CreateAreaDto) {
    this.AreaSchema.create(createAreaDto)
    return  {estatus:HttpStatus.CREATED};
  }

  findAll() {
    return `This action returns all areas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
