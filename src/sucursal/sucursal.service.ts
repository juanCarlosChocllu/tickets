import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sucursal } from './schema/sucursal.schema';
import { Model } from 'mongoose';
import { Flag } from 'src/enums/enum.flag';

@Injectable()
export class SucursalService {
  constructor(@InjectModel(Sucursal.name) private readonly SucursalSchema:Model<Sucursal> ){}
  create(createSucursalDto: CreateSucursalDto) {
    this.SucursalSchema.create(createSucursalDto)
    return { status:HttpStatus.CREATED};
  }

  findAll() {
    return  this.SucursalSchema.find({flag:Flag.nuevo}).select('nombre');
  }

  findOne(id: number) {
    return `This action returns a #${id} sucursal`;
  }

  update(id: number, updateSucursalDto: UpdateSucursalDto) {
    return `This action updates a #${id} sucursal`;
  }

  remove(id: number) {
    return `This action removes a #${id} sucursal`;
  }
}
